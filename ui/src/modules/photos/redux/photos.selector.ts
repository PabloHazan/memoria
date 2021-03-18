import { createSelector } from "reselect";
import { PhotoReducer } from "./photos.reducer";

const selectPhotoState = ({ photo }: any): PhotoReducer => photo

export const selectHome = createSelector(selectPhotoState, photoState => photoState.home)

export const selectCollage = createSelector(selectHome, home => home?.images || []);
export const selectRound = createSelector(selectHome, home => home?.round || []);

export const selectPhotos = createSelector(
    selectCollage,
    selectRound,
    (collage, round) => [...collage, ...round]
);

export const selectCurrentImage = createSelector(selectPhotoState, photoState => photoState.selected);
