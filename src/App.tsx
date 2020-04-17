import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import "App.scss";
import { GotDataActionI, getDataActionCreator } from "store/actions";
import { AppStateI } from "store/state";

interface PropsI {
  getData: () => Promise<GotDataActionI>;
  data: string[];
  dataLoading: boolean;
  dataPosting: boolean;
}

const App: FC<PropsI> = ({ getData, data, dataLoading, dataPosting }) => {
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">App header</header>
      <section>
        {dataLoading && <div>Loading...</div>}
        <ul>
          {console.log(data)}
          {data.map((d, i) => (
            <li className="listItem" key={`data_${i}`}>
              {d}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

const mapStateToProps = (store: AppStateI) => {
  return {
    data: store.dataState.data,
    dataLoading: store.dataState.loading,
    dataPosting: store.dataState.posting
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getData: () => dispatch(getDataActionCreator())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
