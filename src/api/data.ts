import API from "api/API";
import { MusicEventsResponseI, QueryParamsI } from "api/interfaces";

export const MUSIC_EVENTS_URL =
  "https://app.ticketmaster.com/discovery/v2/events?countryCode=FI&classificationId=KZFzniwnSyZfZ7v7nJ";
export const MUSIC_GENRES_URL =
  "https://app.ticketmaster.com/discovery/v2/classifications/KZFzniwnSyZfZ7v7nJ.json";

export const getEventDetailsUrl = (id: string) =>
  `https://app.ticketmaster.com/discovery/v2/events/${id}`;

const api = new API();

export const getMusicEvents = (queryParams?: QueryParamsI) =>
  api.getJson<MusicEventsResponseI>({
    queryParams,
    options: {},
    path: MUSIC_EVENTS_URL,
  });

export const getClassificationsEvents = (queryParams?: QueryParamsI) =>
  api.getJson<any>({
    queryParams,
    options: {},
    path: MUSIC_GENRES_URL,
  });

export const getEventDetails = (id: string) =>
  api.getJson<any>({
    path: getEventDetailsUrl(id),
  });
