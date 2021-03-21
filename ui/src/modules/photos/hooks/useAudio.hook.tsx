import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadingOff, loadingOn } from '../../../shared/loader/redux/loaderAction';

interface IUseAudioConfig {
    repeat?: boolean
}

const baseConfig: IUseAudioConfig = {
    repeat: false,
}

const generateConfig = (config: IUseAudioConfig): IUseAudioConfig => ({ ...baseConfig, ...config });

interface AudioControl {
    play: () => void;
    pause: () => void;
    toggle: () => void;
    isPlaying: boolean;
}

export const useAudio = (sound: string | undefined, config: IUseAudioConfig = {}): AudioControl => {
    config = generateConfig(config);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const audio = useMemo<HTMLAudioElement | undefined>(() => sound ? new Audio(sound) : undefined, [sound])

    const play = useCallback(() => {
        if (audio) {
            audio.play();
            setIsPlaying(true);
        }
    }, [audio]);

    const pause = useCallback(() => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            setIsPlaying(false);
        }
    }, [sound]);

    const toggle = useCallback(() => {
        if (audio) {
            if (isPlaying) pause();
            else play();
        }
    }, [audio, isPlaying]);

    useEffect(() => {
        if (audio) {
            audio.preload = 'all';
            play();
            return pause;
        }
    }, [audio]);

    useEffect(() => {
        if (audio) {
            audio.loop = config.repeat!;
        }
    }, [audio, config.repeat]);

    const dispatch = useDispatch();
    useEffect(() => {
        if (audio) {
            dispatch(loadingOn());
            audio.addEventListener('loadeddata', () => dispatch(loadingOff()), false);
        }
    }, [audio]);
    return {
        play,
        pause,
        toggle,
        isPlaying,
    }
}
