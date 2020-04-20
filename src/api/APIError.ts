export default class APIError extends Error {
  status: number;
  ok: boolean;
  errorBody: any;

  constructor(response: any) {
    super(
      response.detail ||
        response.detailCode ||
        `API request ${response.path} failed with status ${response.status}`
    );
    this.status = response.status;
    this.ok = false;
    this.errorBody = response;
  }
}
