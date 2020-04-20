export interface RequestParametersI {
  path: string;
  queryParams?: object;
  options?: object;
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
