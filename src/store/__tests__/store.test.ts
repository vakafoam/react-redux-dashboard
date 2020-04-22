import thunk from "redux-thunk";
import reduxMockStore from "redux-mock-store";
import { AnyAction } from "redux";
import * as actions from "store/actions";
import fetchMock from "fetch-mock";
import { MusicEventI } from "components/musicEvents/MusicEvents";
import { initialDataState } from "store/state";
import { MUSIC_EVENTS } from "api/data";

const sampleMusicEvent: MusicEventI = {
  name: "Music event",
  type: "event",
  id: "12345",
  url: "htpp://example.com",
  images: [{ ratio: "4_3", url: "http://example2.com" }],
  dates: {},
  promoter: {},
  _links: {
    self: {
      href: "http://goggle.com",
    },
  },
  _embedded: {},
};

const middlewares = [thunk];
const mockStore = reduxMockStore(middlewares);

describe("actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("dispatches gotMusicEventsAction with correct data", () => {
    fetchMock.mock(`${MUSIC_EVENTS}&apikey=${process.env.REACT_APP_API_KEY}`, {
      body: {
        _embedded: { events: [sampleMusicEvent] },
      },
    });

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
