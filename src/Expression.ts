import { Environment } from "./Formula";

export interface BooleanExpr {
    type: "booleanExpr";
    value: boolean;
}

export interface NumberExpr {
    type: "numberExpr";
    value: number;
}

export interface StringExpr {
    type: "stringExpr";
    value: string;
}

export interface BinaryExpr {
    type: "binaryExpr";
    symbol: string;
    left: Expression;
    right: Expression;
}

export interface FunctionCall {
    type: "functionCall";
    name: string;
    args: Expression[];
}

export type Expression
    = BooleanExpr
    | NumberExpr
    | StringExpr
    | BinaryExpr
    | FunctionCall
    ;

const evaluate = (expression: Expression, environment: Environment) => {
    return null; // TODO
}