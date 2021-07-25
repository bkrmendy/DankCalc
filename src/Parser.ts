import { Calculation, CellError, CellValue, Empty, Number, Text } from "./Spreadsheet";
import { Result } from "./utils/Result";
import P, { Parser } from "../parson/src/Parson";
import { Punctuation } from "./utils/Punctuaction";
import { id } from "./utils/Utils";
import { CellLocation, CellLocationRange, CellLocationSingle } from "./dankcalc";
import { ResultBuilder } from "../parson/src/Result";

// TODO: insert parson here

/**
 * Empty cell
 */
export const empty: Parser<Empty> = P.bind(P.str(""), _ => P.result({ type: "empty" }));

/**
 * Textual content
 */
export const punctuation: Parser<string> = P.sat(Punctuation.includes);
export const textCharacter: Parser<string> = P.alternative([P.upper, P.lower, P.space, punctuation]);
export const text: Parser<Text> = P.bind(
    P.stringOf(textCharacter),
    content => P.result({ type: "text", content })
);

/**
 * Decimal number
 */

type SignFn = (_: number) => number;
const minus: Parser<SignFn> = P.bind(P.chr("-"), _ => P.result(n => -n));
const plus: Parser<SignFn> = P.bind(P.chr("+"), _ => P.result(id));
const sign: Parser<SignFn> = P.option(P.alternative([minus, plus]), id);

const fractionalPart: Parser<number> = P.bind(P.chr("."), _ => P.nat);

export const numberFromParts = (sign: SignFn, whole: number, frac: number | null): number => {
    const fracc = frac == null ? 0 : 10 ^ Math.floor(Math.log10(frac)) + 1;
    return sign(whole + fracc);
}

export const numberV: Parser<Number> = P.bind(
    sign,
    signFn => P.bind(
        P.nat,
        whole => P.bind(
            P.option(fractionalPart, null),
            frac => P.result({
                type: "number",
                content: numberFromParts(signFn, whole, frac)
            })
        )
    )
);

/**
 * Calculation
 */

export const cellRangeSingle: Parser<CellLocationSingle> = P.bind(
    P.stringOf(P.upper),
    column => P.bind(
        P.stringOf(P.digit),
        row => P.result({ type: "single", row, column })
    )
);

export const cellLocationRange: Parser<CellLocationRange> = P.bind(
    cellRangeSingle,
    from => P.bind(
        P.chr(":"),
        _ => P.bind(
            cellRangeSingle,
            to => P.result({ type: "range", from, to })
        )
    )
);

export const cellLocation: Parser<CellLocation> = P.plus<CellLocation>(cellLocationRange, cellRangeSingle);

const cellLocationSeparator = P.bind(
    P.many(P.space),
    _ => P.bind(
        P.chr(";"),
        _ => P.many(P.space)
    )
);

const formulaArgs = P.sepBy1(cellLocation, cellLocationSeparator);

const formulaName = P.stringOf(P.upper);
export const calculation: Parser<Calculation> = P.bind(
    P.chr("="),
    _ => P.bind(
        formulaName,
        name => P.bind(
            formulaArgs,
            args => P.result({
                type: "formula",
                cache: null,
                name,
                args
            })
        )
    )
);

export const cellValue: Parser<CellValue> = P.alternative<CellValue>([
    calculation,
    numberV,
    text,
    empty
]);

export const parseCellValue = (content: string): CellValue => {
    const result = P.parse(content, cellValue);
    const syntaxError: CellError = { type: "error", content: "SYNTAXERROR" };
    return result ?? syntaxError;
}