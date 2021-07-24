interface UpdateCellContent {
    type: "updateCell";
    id: string;
    content: string;
}

interface SheetLocation {
    row: number;
    col: number;
}

interface RequestCellUpdate {
    type: "requestCell";
    locations: [SheetLocation];
}

type CalcMessageIn
    = UpdateCellContent
    ;

type CalcMessageOut
    = UpdateCellContent
    | RequestCellUpdate
    ;

type CellContent = { };

interface CalcCell {
    id: string;
    content: CellContent;
}

interface CalcState {
    cells: { [key: string]: CellContent};
    edges: { [key: string]: string[] };
}

type CalcDispatch = (state: CalcState, message: CalcMessageIn[]) => [CalcState, CalcMessageOut[]];

const 

function parseCellContent(content: string): CellContent {

}



