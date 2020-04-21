import APIError from "api/APIError";
import {
  APIErrorResponseI,
  PostRequestParametersI,
  RequestParametersI,
  QueryParamsI,
} from "api/interfaces";

const baseHeaders = { "Content-Type": "application/json; charset=utf-8" };

const parseResponseWithJson = async <ResultType>(
  response: Response
): Promise<ResultType> => {
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    throw new APIError({
      status: response.status,
      path: response.url,
      titleCode: "errors.parsing.unparsableJson",
      detailCode: "errors.parsing.unparsableJson",
    });
  }
};

const getQueryParamsString = (
  apiKey?: string,
  params?: QueryParamsI
): string => {
  let queryString: string = "";
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      queryString += `&${k}=${v}`;
    }
  }
  if (apiKey) {
    queryString += `&apikey=${apiKey}`;
  }
  return queryString;
};

export default class API {
  private apiKey = process.env.REACT_APP_API_KEY;

  async getJson<ResultType>({
    path,
    queryParams,
  }: RequestParametersI): Promise<{ result: ResultType; headers: Headers }> {
    const fullPath = path + getQueryParamsString(this.apiKey, queryParams);

    const defaultOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Language": "en",
      },
    };

    const response = await fetch(fullPath, defaultOptions);

    if (response.ok) {
      const result = await parseResponseWithJson<ResultType>(response);

      console.log("RES", result);
      return {
        result,
        headers: response.headers,
      };
    }

    const error: APIErrorResponseI = await parseResponseWithJson<
      APIErrorResponseI
    >(response);

    throw new APIError(error);
  }

  async postJson<ResultType>({
    path,
    body = {},
    queryParams = {},
    options = {},
  }: PostRequestParametersI) {
    return this.getJson<ResultType>({
      path,
      queryParams,
      options: {
        method: "POST",
        body: JSON.stringify(body),
        headers: baseHeaders,
        ...options,
      },
    });
  }
}
