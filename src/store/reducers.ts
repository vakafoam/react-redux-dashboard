import { combineReducers, Reducer } from "redux";
import { ActionType, DataActions } from "store/actions";
import { AppStateI, initialDataState, DataStateI } from "store/state";

const dataReducer: Reducer<DataStateI, DataActions> = (
  state = initialDataState,
  action
) => {
  switch (action.type) {
    case ActionType.GETTING_DATA: {
      return {
        ...state,
        loading: true
      };
    }
    case ActionType.GOT_DATA: {
      return {
        ...state,
        data: action.data,
        loading: false
      };
    }
    case ActionType.POSTING_DATA: {
      return {
        ...state,
        posting: true
      };
    }
    case ActionType.POSTED_DATA: {
      return {
        ...state,
        posting: false,
        people: state.data.concat(action.result)
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
  dataState: dataReducer
});
