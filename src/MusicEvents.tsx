import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  getMusicEventsActionCreator,
  GotMusicEventsActionI,
} from "store/actions";
import { AppStateI } from "store/state";

export interface PaginationI {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface MusicEventI {
  name: string;
  type: string;
  id: string;
  url: string;
  images: object[];
  dates: object;
  promoter: object;
  _links: {
    self: {
      href: string;
    };
  };
  _embedded: object;
}

export interface MusicEventsResponseI {
  _embedded: {
    events: MusicEventI[];
  };
  _links: object;
  page: PaginationI;
}

interface PropsI {
  getMusicEvents: () => Promise<GotMusicEventsActionI>;
  musicEvents: MusicEventI[];
  loading: boolean;
  posting: boolean;
}

const MusicEvents = ({ getMusicEvents, musicEvents, loading }: PropsI) => {
  useEffect(() => {
    getMusicEvents();
  }, [getMusicEvents]);

  return (
    <div>
      <h1>Music events</h1>

      <section>
        {loading && <div>Loading...</div>}
        <ul>
          {musicEvents.map((evnt, i) => (
            <li className="listItem" key={`data_${i}`}>
              {evnt.name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

const mapStateToProps = (store: AppStateI) => {
  return {
    musicEvents: store.musicEventState.musicEvents,
    loading: store.musicEventState.loading,
    posting: store.musicEventState.posting,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getMusicEvents: () => dispatch(getMusicEventsActionCreator()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicEvents);
