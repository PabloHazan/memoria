import React, { createContext, useContext } from 'react';
import { AudioControl } from './modules/photos/hooks/useAudio.hook';

interface AppContextContent {
    audioControl?: AudioControl
}

const AppContext = createContext<AppContextContent>({});

export const AppProvider = AppContext.Provider;
export const useAppContext = () => useContext(AppContext);
export const useGlobalAudio = () => useAppContext().audioControl!;
