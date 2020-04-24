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
    queryParams = {},
    options = {},
  }: RequestParametersI): Promise<
    { result: ResultType; headers: Headers } | undefined
  > {
    const fullPath = path + getQueryParamsString(this.apiKey, queryParams);

    const defaultOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Language": "en",
      },
    };

    let response: Response;
    try {
      response = await fetch(fullPath, { ...defaultOptions, ...options });
      if (!response.ok) {
        const error: APIErrorResponseI = await parseResponseWithJson<
          APIErrorResponseI
        >(response);

        throw new APIError(error);
      }

      const result = await parseResponseWithJson<ResultType>(response);

      return {
        result,
        headers: response.headers,
      };
    } catch (e) {
      console.error("Error occured:", e);
    }
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
