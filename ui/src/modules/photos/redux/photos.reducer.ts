import { createReducer } from "../../../core/redux/creators";
import { Config } from "../hooks/findConfig.hook";
import { Image } from "../model/image";
import { PhotoAction } from "./photos.action";

export interface PhotoReducer {
    selected: Image | null;
    home: Config | null;
}

const initialState: PhotoReducer = {
    selected: null,
    home: null,
}

export const photoReducer = createReducer(initialState, {
    [PhotoAction.SET_HOME]: ({ data }) => ({ home: data }),
    [PhotoAction.SET_SELECTED_PHOTO]: ({ data }) => ({ selected: data }),
});