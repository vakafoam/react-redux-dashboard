import React, { useState, SyntheticEvent } from "react";
import { MusicEventI } from "api/interfaces";
import EventDetails from "components/musicEvents/EventDetails";

interface PropsI {
  event: MusicEventI;
}

const get4x3Image = (event: MusicEventI) => {
  const image = event.images.find((i) => i.ratio === "4_3");
  return image ? image.url : event.images[0].url;
};

const EventCard = ({ event }: PropsI) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const onClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };

  const onMouseEnter = () => setIsActive(true);
  const onMouseLeave = () => setIsActive(false);

  return (
    <div
      className="events__card"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img src={get4x3Image(event)} alt={event.name} />
      {isActive && <EventDetails event={event} />}
    </div>
  );
};

export default EventCard;
