import React, { SyntheticEvent } from "react";
import { MusicEventI } from "api/interfaces";
import DateIcon from "components/icons/DateIcon";
import LocationIcon from "components/icons/LocationIcon";

const EventDetails = ({ event }: { event: MusicEventI }) => {
  const location = `${event._embedded.venues[0].country.name}, ${event._embedded.venues[0].city.name},\xa0`;
  const venueAddress = ` ${event._embedded.venues[0].address.line1}`;
  const status = event.dates.status.code.toUpperCase();
  const statusModifierClass =
    status === "ONSALE"
      ? "details__status--active"
      : status === "CANCELLED"
      ? "details__status--inactive"
      : "details__status--other";
  const date = new Date(event.dates.start.localDate).toLocaleDateString();

  const getMoreDetails = (e: SyntheticEvent, id: string) => {
    e.stopPropagation();
    // TODO: fetch more event details
    console.log("More detais of ", id);
  };

  return (
    <div className="events__card__details">
      <h3 className="details__heading">{event.name}</h3>
      <span className={`details__status ${statusModifierClass}`}>{status}</span>

      <div className="details__icon-text">
        <DateIcon className="details__icon" />
        <span>{date}</span>

        <span> {`\xa0${event.dates.start.localTime}`}</span>
      </div>

      <div className="details__icon-text">
        <LocationIcon className="details__icon" />
        <span>{location}</span>
        <a
          className="details__venue-link"
          onClick={(e: SyntheticEvent) => e.stopPropagation()}
          href={event._embedded.venues[0].url}
        >
          {venueAddress}
        </a>
      </div>
      <button
        className="details__button"
        type="button"
        onClick={(e) => {
          getMoreDetails(e, event.id);
        }}
      >
        More details
      </button>
    </div>
  );
};

export default EventDetails;
