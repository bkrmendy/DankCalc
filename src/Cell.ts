interface Text {
    type: "text";
    content: string;
}

interface Number {
    type: "number";
    content: number;
}

interface Formula {
    type: "formula";
    // TODO
}

type CellContent
    = Text
    | Number
    | Formula
    ;

interface CellLocation {
    row: string;
    column: string;
}

