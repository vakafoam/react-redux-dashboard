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
