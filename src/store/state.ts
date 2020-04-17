import { DataType } from "store/actions";

export interface DataStateI {
  readonly data: DataType[];
  readonly loading: boolean;
  readonly posting: boolean;
}

export interface AppStateI {
  readonly dataState: DataStateI;
}

export const initialDataState: DataStateI = {
  data: [],
  loading: false,
  posting: false
};
