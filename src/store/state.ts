import { MusicEventI } from "components/musicEvents/MusicEvents";

export interface MusicEventStateI {
  readonly musicEvents: MusicEventI[];
  readonly loading: boolean;
  readonly posting: boolean;
}

export interface AppStateI {
  readonly musicEventState: MusicEventStateI;
}

export const initialDataState: MusicEventStateI = {
  musicEvents: [],
  loading: false,
  posting: false,
};
