import { ActionCreator } from "../../../core/redux/creators";
import { HomeStructure } from "../hooks/findImages.hook";
import { Image } from "../model/image";

export enum PhotoAction {
    SET_HOME = 'SET_HOME',
    SET_SELECTED_PHOTO = 'SET_SELECTED_PHOTO',
}

export const setHome = ActionCreator<HomeStructure>(PhotoAction.SET_HOME);
export const setSelectedPhoto = ActionCreator<Image>(PhotoAction.SET_SELECTED_PHOTO);
export const cleanSelectedPhoto = ActionCreator<null>(PhotoAction.SET_SELECTED_PHOTO);
