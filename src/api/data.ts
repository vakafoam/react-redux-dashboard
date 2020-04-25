import API from "api/API";
import {
  MusicEventsResponseI,
  QueryParamsI,
  ClassificationsResponseI,
} from "api/interfaces";

export const CLASSIFICATION_ID = "KZFzniwnSyZfZ7v7nJ";

export const getMusicEventsUrl = (classId = CLASSIFICATION_ID) =>
  `https://app.ticketmaster.com/discovery/v2/events?countryCode=FI&classificationId=${classId}`;

// API is not consistent with apikey query parameter, so adding it here as temporary solution
export const getMusicGenresUrl = (classId = CLASSIFICATION_ID) =>
  `https://app.ticketmaster.com/discovery/v2/classifications/${classId}.json?apikey=${process.env.REACT_APP_API_KEY}`;

export const getEventDetailsUrl = (id: string) =>
  `https://app.ticketmaster.com/discovery/v2/events/${id}`;

const api = new API();

export const getMusicEvents = (classId?: string, queryParams?: QueryParamsI) =>
  api.getJson<MusicEventsResponseI>({
    queryParams,
    options: {},
    path: getMusicEventsUrl(classId),
  });

export const getEventsClassifications = (
  id?: string,
  queryParams?: QueryParamsI
) =>
  api.getJson<ClassificationsResponseI>({
    queryParams,
    options: {},
    path: getMusicGenresUrl(id),
  });

export const getEventDetails = (id: string) =>
  api.getJson<any>({
    path: getEventDetailsUrl(id),
  });
