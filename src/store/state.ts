import { MusicEventI, ClassificationI } from "api/interfaces";
import { CLASSIFICATION_ID } from "api/data";

export interface MusicEventStateI {
  readonly musicEvents: MusicEventI[];
  readonly loading: boolean;
  readonly posting: boolean;
}

export interface ActiveClassificationStateI {
  readonly activeClassification: ClassificationI;
}

export interface AppStateI {
  readonly musicEventState: MusicEventStateI;
  readonly activeClassificationState: ActiveClassificationStateI;
}

export const initialDataState: MusicEventStateI = {
  musicEvents: [],
  loading: false,
  posting: false,
};

export const initialActiveClassificationState: ActiveClassificationStateI = {
  activeClassification: {
    id: CLASSIFICATION_ID,
    name: "All genres",
  },
};
