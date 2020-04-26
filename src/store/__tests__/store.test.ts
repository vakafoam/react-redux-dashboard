import thunk from "redux-thunk";
import reduxMockStore from "redux-mock-store";
import { AnyAction } from "redux";
import * as actions from "store/actions";
import fetchMock from "fetch-mock";
import { MusicEventI } from "api/interfaces";
import { initialDataState } from "store/state";
import { getMusicEventsUrl } from "api/data";
import { musicEventsReducer } from "store/reducers";

const sampleMusicEvent: MusicEventI = {
  name: "Music event",
  type: "event",
  id: "12345",
  url: "htpp://example.com",
  images: [{ ratio: "4_3", url: "http://example2.com" }],
  dates: {
    start: { localDate: "some data", localTime: "some time" },
    status: { code: "code" },
  },
  promoter: {},
  _links: {
    self: {
      href: "http://goggle.com",
    },
  },
  _embedded: {
    venues: [
      {
        url: "https",
        city: { name: "Tallinn" },
        country: { name: "Estonia", countryCode: "EE" },
        address: { line1: "Tartu mnt" },
      },
    ],
  },
};

const middlewares = [thunk];
const mockStore = reduxMockStore(middlewares);

describe("Actions test", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("dispatches gotMusicEventsAction with correct data", () => {
    fetchMock.mock(
      `${getMusicEventsUrl()}&apikey=${process.env.REACT_APP_API_KEY}`,
      {
        body: {
          _embedded: { events: [sampleMusicEvent] },
        },
      }
    );

    const expectedActions = [
      { type: actions.ActionType.GETTING_MUSIC_EVENTS },
      { type: actions.ActionType.GOT_MUSIC_EVENTS, data: [sampleMusicEvent] },
    ];
    const store = mockStore({ musicEventsState: initialDataState });

    return store
      .dispatch((actions.getMusicEventsActionCreator() as unknown) as AnyAction)
      .then(() => {
        const actionsDispatched = store.getActions();
        expect(actionsDispatched).toEqual(expectedActions);
      });
  });
});

describe("Reducer tests", () => {
  it("should return initial state", () => {
    expect(musicEventsReducer(undefined, {} as actions.DataActions)).toEqual(
      initialDataState
    );
  });

  it("should update musicEvents state data on GOT_MUSIC_EVENTS action", () => {
    expect(
      musicEventsReducer(undefined, {
        type: actions.ActionType.GOT_MUSIC_EVENTS,
        data: [sampleMusicEvent],
      })
    ).toEqual({
      loading: false,
      posting: false,
      musicEvents: [sampleMusicEvent],
    });
  });
});
