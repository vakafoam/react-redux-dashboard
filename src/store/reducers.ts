import { combineReducers, Reducer } from "redux";
import { ActionType, DataActions } from "store/actions";
import { AppStateI, initialDataState, MusicEventStateI } from "store/state";

const musicEventsReducer: Reducer<MusicEventStateI, DataActions> = (
  state = initialDataState,
  action
) => {
  switch (action.type) {
    case ActionType.GETTING_MUSIC_EVENTS: {
      return {
        ...state,
        loading: true,
      };
    }
    case ActionType.GOT_MUSIC_EVENTS: {
      return {
        ...state,
        musicEvents: action.data,
        loading: false,
      };
    }
    case ActionType.POSTING_DATA: {
      return {
        ...state,
        posting: true,
      };
    }
    case ActionType.POSTED_DATA: {
      return {
        ...state,
        posting: false,
        musicEvents: state.musicEvents.concat(action.result),
      };
    }
    default:
      neverReached(action); // when a new action is created, this helps us remember to handle it in the reducer
  }
  return state;
};

// tslint:disable-next-line:no-empty
const neverReached = (never: never) => {};

export const rootReducer = combineReducers<AppStateI>({
  musicEventState: musicEventsReducer,
});
