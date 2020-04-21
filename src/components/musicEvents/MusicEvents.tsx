import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  getMusicEventsActionCreator,
  GotMusicEventsActionI,
} from "store/actions";
import { AppStateI } from "store/state";
import EventCard from "components/musicEvents/EventCard";
import "components/musicEvents/musicEvents.scss";

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
  images: { ratio: string; url: "string" }[];
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
}

const MusicEvents = ({ getMusicEvents, musicEvents, loading }: PropsI) => {
  useEffect(() => {
    getMusicEvents();
  }, [getMusicEvents]);

  const onEventClick = () => {
    console.log("event clicked");
  };

  return (
    <section className="events">
      {loading ? (
        <p className="events__loading">Loading...</p>
      ) : musicEvents.length ? (
        musicEvents.map((evnt) => (
          <EventCard
            event={evnt}
            onClick={onEventClick}
            key={`event_${evnt.id}`}
          />
        ))
      ) : (
        <span>No results found. Please try different filters</span>
      )}
    </section>
  );
};

const mapStateToProps = (store: AppStateI) => {
  return {
    musicEvents: store.musicEventState.musicEvents,
    loading: store.musicEventState.loading,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getMusicEvents: () => dispatch(getMusicEventsActionCreator()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicEvents);
