import API from "api/API";
import { MusicEventsResponseI } from "MusicEvents";

export const MUSIC_EVENTS =
  "https://app.ticketmaster.com/discovery/v2/events?countryCode=FI&classificationId=KZFzniwnSyZfZ7v7nJ";
export const EVENT_DETAILS =
  "app.ticketmaster.com/discovery/v2/events/<eventId>";
export const MUSIC_GENRES =
  "app.ticketmaster.com/discovery/v2/classifications/KZFzniwnSyZfZ7v7nJ";

const api = new API();

export const getMusicEvents = () =>
  // queryParams?: ListParams,
  api.getJson<MusicEventsResponseI>({
    // queryParams: {},
    // options?: {},
    path: MUSIC_EVENTS,
  });
