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
import { MusicEventI, ClassificationI, QueryParamsI } from "api/interfaces";

interface PropsI {
  activeClassification: ClassificationI;
  getMusicEvents: (
    clsId?: string,
    query?: QueryParamsI
  ) => Promise<GotMusicEventsActionI>;
  musicEvents: MusicEventI[];
  loading: boolean;
}

const MusicEvents = ({
  activeClassification,
  getMusicEvents,
  musicEvents,
  loading,
}: PropsI) => {
  useEffect(() => {
    getMusicEvents(activeClassification.id);
  }, [activeClassification.id, getMusicEvents]);

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
    activeClassification: store.activeClassificationState.activeClassification,
    musicEvents: store.musicEventState.musicEvents,
    loading: store.musicEventState.loading,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getMusicEvents: (clsId?: string, query?: QueryParamsI) =>
      dispatch(getMusicEventsActionCreator(clsId, query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicEvents);
