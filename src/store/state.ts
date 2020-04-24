import { MusicEventI } from "api/interfaces";

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
