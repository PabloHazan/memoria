import { createReducer } from "../../../core/redux/creators";
import {
    LoaderAction
} from "./loaderAction";

export interface LoaderState {
    currentLoader: number;
}

const initialState: LoaderState = {
    currentLoader: 0
}

export const loaderReducer = createReducer<LoaderState>(initialState, {
    [LoaderAction.LOADING_ON]: ({ state }) => ({ currentLoader: state.currentLoader + 1 }),
    [LoaderAction.LOADING_OFF]: ({ state }) => ({ currentLoader: state.currentLoader - 1 }),
    [LoaderAction.FULL_LOADING_OFF]: () => ({ currentLoader: 0 })
});