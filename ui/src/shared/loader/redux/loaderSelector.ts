import { LoaderState } from './loaderReducer';
import { createSelector } from "reselect";

const selectLoaderState = ({ loader }: any): LoaderState => loader

export const selectIsLoading = createSelector(
    selectLoaderState,
    ({ currentLoader }) => currentLoader > 0
);