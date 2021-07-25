import assert from "assert";
import { CellLocation, CellLocationSingle } from "./dankcalc";

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

export const CellValueBuilder = {
    empty: (): Empty => ({ type: "empty" }),
    text: (content: string): Text => ({ type: "text", content }),
    number: (content: number): Number => ({ type: "number", content }),
    error: (content: string): CellError => ({ type: "error", content }),
    calculation: (name: string, args: CellLocation[]): Calculation => ({ type: "formula", cache: null, name, args })
}