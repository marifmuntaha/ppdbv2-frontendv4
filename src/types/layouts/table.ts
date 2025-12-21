import type {JSX} from "react";

export interface ColumnType<T> {
    name: string;
    selector: (row: T) => number | string | boolean | undefined;
    sortable: boolean;
    cell?: (row: T) => JSX.Element;
    width?: string;
}