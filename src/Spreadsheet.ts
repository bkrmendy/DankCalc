import { CellLocation } from "./dankcalc";

export interface Empty {
    type: "empty"
}

export interface Text {
    type: "text";
    content: string;
}

export interface Number {
    type: "number";
    content: number;
}

export interface CellError {
    type: "error";
    content: string;
}

export type CellContentPrimitive
    = Empty
    | Text
    | Number
    ;

export interface Calculation {
    type: "formula";
    cache: CellContentPrimitive | null;
    name: string;
    args: CellLocation[];
}

export type CellValue
    = Empty
    | Text
    | Number
    | CellError
    | Calculation
    ;

