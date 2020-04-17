import { createStore, Store, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { AppStateI } from "store/state";
import { rootReducer } from "store/reducers";

export function configureStore(): Store<AppStateI> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}
