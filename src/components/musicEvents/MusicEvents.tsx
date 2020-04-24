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
import { MusicEventI } from "api/interfaces";

interface PropsI {
  getMusicEvents: () => Promise<GotMusicEventsActionI>;
  musicEvents: MusicEventI[];
  loading: boolean;
}

const MusicEvents = ({ getMusicEvents, musicEvents, loading }: PropsI) => {
  useEffect(() => {
    getMusicEvents();
  }, [getMusicEvents]);

  return (
    <section className="events">
      {loading ? (
        <p className="events__loading">Loading...</p>
      ) : musicEvents.length ? (
        musicEvents.map((evnt) => (
          <EventCard event={evnt} key={`event_${evnt.id}`} />
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
