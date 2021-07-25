import { suite } from "../parson/src/ParsonTest";

import { calculation, cellLocationRange, cellRangeSingle, empty, numberFromParts, numberV, text } from "../src/Parser";
import { CellValueBuilder } from "../src/Spreadsheet";
import { id } from "../src/utils/Utils";

describe("decimal number calculation", () => {
    const minus = (n: number) => -n;
    it("no sign, no fractional part", () => {
        const n = numberFromParts(id, 123, null);
        expect(n).toEqual(123);
    });

    it("negative sign, no fractional part", () => {
        const n = numberFromParts(minus, 123, null);
        expect(n).toEqual(-123);
    });

    it("no sign, fractional part", () => {
        const n = numberFromParts(id, 123, 456);
        expect(n).toEqual(123.456);
    });

    it("negative sign, fractional part", () => {
        const n = numberFromParts(minus, 123, 456);
        expect(n).toEqual(-123.456);
    });
});

describe("cell range parser", () => {
    it("cell range single", () => suite(cellRangeSingle, [
        { source: "A1", expected: { type: "single", column: "A", row: "1" } },
        { source: "AR13", expected: { type: "single", column: "AR", row: "13" } },
        { source: "aB1", expected: null },
        { source: "1A", expected: null },
        { source: "4>", expected: null },
    ]));

    it("cell range multi", () => suite(cellLocationRange, [
        { source: "A1:R4", expected: { type: "range", from: { type: "single", column: "A", row: "1" }, to: { type: "single", column: "R", row: "4" } } },
        { source: "A1R4", expected: null },
        { source: "A1", expected: null },
    ]));
});

describe("cell value parsers", () => {
    it("empty cell suite", () => suite(empty, [
        { source: "", expected: CellValueBuilder.empty() },
        { source: "Todos", expected: null },
        { source: "123", expected: null }
    ]));

    it("text cell parser", () => suite(text, [
        { source: "Hello there", expected: CellValueBuilder.text("Hello there") },
        { source: "General Kenobi!", expected: CellValueBuilder.text("General Kenobi!") },
        { source: "R2-D2", expected: CellValueBuilder.text("R2-D2") },
        { source: "=this is not really a function", expected: CellValueBuilder.text("=this is not really a function") },

        // these is here for documentation purposes - the text parser could parse strings of digits and expressions that look like formulae,
        // so the order in the top level parser very much matters
        { source: "42", expected: CellValueBuilder.text("42") },
        { source: "=SUM(A1:A5)", expected: CellValueBuilder.text("=SUM(A1:A5)") },
    ]));

    it("number parser", () => suite(numberV, [
        { source: "asd", expected: null },
        { source: "a12", expected: null },
        { source: "596", expected: CellValueBuilder.number(596) },
        { source: "-596", expected: CellValueBuilder.number(-596) },
        { source: "596.3", expected: CellValueBuilder.number(596.3) },
        { source: "-596.3", expected: CellValueBuilder.number(-596.3) },
    ]));

    it("calculation", () => suite(calculation, [
        { source: "SUM(A1:A5)", expected: null },
        { source: "=SUM(A1:A5)", expected: CellValueBuilder.calculation("SUM", [{ type: "range", from: { type: "single", column: "A", row: "1" }, to: { type: "single", column: "A", row: "5" } }]) },
        { source: "=SUM(A1:A5;B5)", expected: CellValueBuilder.calculation("SUM", [{ type: "range", from: { type: "single", column: "A", row: "1" }, to: { type: "single", column: "A", row: "5" } }, { type: "single", column: "B", row: "5" }])}
    ]))
})