export interface RequestParametersI {
  path: string;
  queryParams?: QueryParamsI;
  options?: object;
}

export interface QueryParamsI {
  keyword?: string; // search word
}

export interface PostRequestParametersI extends RequestParametersI {
  body?: object;
}

export interface APIErrorResponseI {
  status: number;
  path: string;
  titleCode: string;
  detailCode: string;
}

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
  images: { ratio: string; url: string }[];
  dates: {
    start: { localDate: string; localTime: string };
    status: { code: string };
    timezone?: string;
  };
  promoter: object;
  _links: {
    self: {
      href: string;
    };
  };
  _embedded: {
    venues: {
      url: string;
      city: { name: string };
      country: { name: string; countryCode: string };
      address: { line1: string; line2?: string };
    }[];
  };
}

export interface MusicEventsResponseI {
  _embedded: {
    events: MusicEventI[];
  };
  _links: object;
  page: PaginationI;
}
