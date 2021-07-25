import { assertNever } from "./utils/Utils";
import { Result } from "./Result";
import { CellValue } from "./Spreadsheet";

export interface CellRangeSingle {
    type: "single";
    value: CellValue;
}

export interface CellRangeArray {
    type: "array";
    values: CellValue[];
}

export type CellRange
    = CellRangeSingle
    | CellRangeArray
    ;

export type FormulaFn = (args: CellRange[]) => Result<CellValue, string>;
export type OperatorFn = (left: CellRange, right: CellRange) => Result<CellValue, string>;

export interface AddFunction {
    type: "addFunction";
    name: string;
    evaluate: FormulaFn;
};

export interface AddOperator {
    type: "addOperator";
    symbol: string;
    evaluate: OperatorFn;
}

type Define
    = AddFunction
    | AddOperator
    ;

export interface Environment {
    defines: Map<string, FormulaFn>;
    operators: Map<string, OperatorFn>;
}

const define = (add: Define, environment: Environment): Environment => {
    switch (add.type) {
        case "addFunction": environment.defines.set(add.name, add.evaluate); return environment;
        case "addOperator": environment.operators.set(add.symbol, add.evaluate); return environment;
        default: assertNever(add);
    }
}