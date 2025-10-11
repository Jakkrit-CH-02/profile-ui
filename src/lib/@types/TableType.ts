export enum DataType {
   Text,
   Component,
   Action,
   Status,
}

export type Column = {
   id: string;
   label?: string;
   dataType: DataType;
   minWidth?: number;
   align?: 'right' | 'left' | 'center';
   format?: (value: number) => string;
   canSort?: boolean;
   truncate?: boolean;
   enablePinning?: boolean;
   piningSide?: "left" | "right";
}

export type PagingState = {
   keyword?: string
   limit: number
   page: number
   offset: number
}

export type TableState<T> = {
   rows: T[],
   total: number
}

export type Order = 'asc' | 'desc';

export type HeaderColumn = {
   label: string
   minWidth?: number
   align?: "right" | "center"
   format?: ((value: number) => string)
   canSort?: boolean
   truncate?: boolean
   rowSpan?: number
   colSpan?: number
   enablePinning?: boolean
   pinnigSide?: "left" | "right"
}