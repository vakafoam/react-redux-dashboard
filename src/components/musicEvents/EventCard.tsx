import React from "react";
import { MusicEventI } from "components/musicEvents/MusicEvents";

interface PropsI {
  event: MusicEventI;
  onClick: () => void;
}

const get4x3Image = (event: MusicEventI) => {
  const image = event.images.find((i) => i.ratio === "4_3");
  return image ? image.url : event.images[0].url;
};

const EventCard = ({ event, onClick }: PropsI) => {
  return (
    <div className="events__card" onClick={onClick}>
      <img src={get4x3Image(event)} alt={event.name} />
    </div>
  );
};

export default EventCard;
