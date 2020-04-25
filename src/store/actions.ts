import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { getMusicEvents } from "api/data";
import {
  MusicEventsResponseI,
  MusicEventI,
  QueryParamsI,
  ClassificationI,
} from "api/interfaces";

export enum ActionType {
  GETTING_MUSIC_EVENTS = "GETTING_MUSIC_EVENTS",
  GOT_MUSIC_EVENTS = "GOT_MUSIC_EVENTS",

  // Will need later?
  POSTING_DATA = "POSTING_DATA",
  POSTED_DATA = "POSTED_DATA",
}

export enum ClassificationActionType {
  SET_ACTIVE_CLASSIFICATION = "SET_ACTIVE_CLASSIFICATION",
}

export interface SetClassificationActionI
  extends Action<ClassificationActionType.SET_ACTIVE_CLASSIFICATION> {
  activeClassification: ClassificationI;
}

export interface GettingMusicEventsActionI
  extends Action<ActionType.GETTING_MUSIC_EVENTS> {}

export interface GotMusicEventsActionI
  extends Action<ActionType.GOT_MUSIC_EVENTS> {
  data: MusicEventI[];
}

export interface PostingDataActionI extends Action<ActionType.POSTING_DATA> {
  type: ActionType.POSTING_DATA;
}

export interface PostedDataActionI extends Action<ActionType.POSTED_DATA> {
  result: MusicEventI;
}

export type DataActions =
  | GettingMusicEventsActionI
  | GotMusicEventsActionI
  | PostingDataActionI
  | PostedDataActionI;

export const getMusicEventsActionCreator: ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<GotMusicEventsActionI>,
  // The type for the data within the last action
  MusicEventsResponseI,
  // The type of the parameter for the nested function
  [string, QueryParamsI],
  // The type of the last action to be dispatched
  GotMusicEventsActionI
>> = (clsId?: string, queryParams?: QueryParamsI) => {
  return async (dispatch: Dispatch) => {
    const gettingMusicEventsAction: GettingMusicEventsActionI = {
      type: ActionType.GETTING_MUSIC_EVENTS,
    };
    dispatch(gettingMusicEventsAction);
    const response = await getMusicEvents(clsId, queryParams); // API call here
    const data: MusicEventI[] = response?.result?._embedded?.events || [];
    const gotMusicEventsAction: GotMusicEventsActionI = {
      data,
      type: ActionType.GOT_MUSIC_EVENTS,
    };
    return dispatch(gotMusicEventsAction);
  };
};

export const setClassificationActionCreator: ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<SetClassificationActionI>,
  // The type for the data within the last action
  null,
  // The type of the parameter for the nested function
  ClassificationI,
  // The type of the last action to be dispatched
  SetClassificationActionI
>> = (classification: ClassificationI) => {
  return async (dispatch: Dispatch) => {
    const setClassification: SetClassificationActionI = {
      activeClassification: classification,
      type: ClassificationActionType.SET_ACTIVE_CLASSIFICATION,
    };
    return dispatch(setClassification);
  };
};
