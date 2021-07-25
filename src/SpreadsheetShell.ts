import { Environment } from "./Formula";
import { CellValue } from "./Spreadsheet";

export interface CellLocationSingle {
    type: "single";
    row: string;
    column: string;
}

export interface CellLocationRange {
    type: "range"
    from: CellLocationSingle;
    to: CellLocationSingle;
}

export type CellLocation
    = CellLocationSingle
    | CellLocationRange
    ;

interface UpdateCellContent {
    location: CellLocation;
    content: string;
}

interface UpdateCellValue {
    location: CellLocation;
    value: CellValue;
}

interface CalcState {
    environment: Environment;
    cells: Map<CellLocation, CellValue>;
}

type CalcDispatch = (state: CalcState, message: UpdateCellContent[]) => [CalcState, UpdateCellValue[]];



