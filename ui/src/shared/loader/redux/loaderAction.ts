import { ActionCreator } from '../../../core/redux/creators';

export enum LoaderAction {
    LOADING_ON = 'LOADING_ON',
    LOADING_OFF = 'LOADING_OFF',
    FULL_LOADING_OFF = 'FULL_LOADING_OFF',
}

export const loadingOn = ActionCreator(LoaderAction.LOADING_ON);
export const loadingOff = ActionCreator(LoaderAction.LOADING_OFF);
export const fullLoadingOff = ActionCreator(LoaderAction.FULL_LOADING_OFF);
