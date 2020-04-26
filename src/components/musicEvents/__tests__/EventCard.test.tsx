import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { MusicEventI } from "api/interfaces";
import EventCard from "components/musicEvents/EventCard";

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

let container: Element | null = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
});

describe("EventCard", () => {
  it("should render correctly and match snapshot", () => {
    act(() => {
      render(<EventCard event={sampleMusicEvent} />, container);
    });

    expect(container).toMatchSnapshot();
  });
});
