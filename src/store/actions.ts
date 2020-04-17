import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

export enum ActionType {
  GETTING_DATA = "GETTING_DATA",
  GOT_DATA = "GOT_DATA",
  POSTING_DATA = "POSTING_DATA",
  POSTED_DATA = "POSTED_DATA"
}

// define your data structure here
export type DataType = string;

export interface GettingDataActionI extends Action<ActionType.GETTING_DATA> {}

export interface GotDataActionI extends Action<ActionType.GOT_DATA> {
  data: DataType[];
}

export interface PostingDataActionI extends Action<ActionType.POSTING_DATA> {
  type: ActionType.POSTING_DATA;
}

export interface PostedDataActionI extends Action<ActionType.POSTED_DATA> {
  result: string;
}

export type DataActions =
  | GettingDataActionI
  | GotDataActionI
  | PostingDataActionI
  | PostedDataActionI;

export const getDataActionCreator: ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<GotDataActionI>,
  // The type for the data within the last action
  DataType[],
  // The type of the parameter for the nested function
  null,
  // The type of the last action to be dispatched
  GotDataActionI
>> = () => {
  return async (dispatch: Dispatch) => {
    const gettingDataAction: GettingDataActionI = {
      type: ActionType.GETTING_DATA
    };
    dispatch(gettingDataAction);
    // const data = await getPeopleFromApi();  // API call here
    const data = await apiCall(); // API call here
    const gotDataAction: GotDataActionI = {
      data,
      type: ActionType.GOT_DATA
    };
    return dispatch(gotDataAction);
  };
};

async function apiCall(): Promise<DataType[]> {
  console.log("DATA fetch");
  return new Promise((res, rej) =>
    setTimeout(() => res(["10", "20", "30"]), 1000)
  );
}
