import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { MusicEventsResponseI, MusicEventI } from "MusicEvents";
import { getMusicEvents } from "api/data";

export enum ActionType {
  GETTING_MUSIC_EVENTS = "GETTING_MUSIC_EVENTS",
  GOT_MUSIC_EVENTS = "GOT_MUSIC_EVENTS",

  // Will need later?
  POSTING_DATA = "POSTING_DATA",
  POSTED_DATA = "POSTED_DATA",
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
  null,
  // The type of the last action to be dispatched
  GotMusicEventsActionI
>> = () => {
  return async (dispatch: Dispatch) => {
    const gettingMusicEventsAction: GettingMusicEventsActionI = {
      type: ActionType.GETTING_MUSIC_EVENTS,
    };
    dispatch(gettingMusicEventsAction);
    const { result }: { result: MusicEventsResponseI } = await getMusicEvents(); // API call here
    const events: MusicEventI[] = result._embedded.events;
    const gotMusicEventsAction: GotMusicEventsActionI = {
      data: events,
      type: ActionType.GOT_MUSIC_EVENTS,
    };
    return dispatch(gotMusicEventsAction);
  };
};
