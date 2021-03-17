import React, { useCallback, useEffect, useMemo } from 'react';

interface IUseAudioConfig {
    repeat?: boolean
}

const baseConfig: IUseAudioConfig = {
    repeat: false,
}

const generateConfig = (config: IUseAudioConfig): IUseAudioConfig => ({ ...baseConfig, ...config });

export const useAudio = (sound: string | undefined, config: IUseAudioConfig = {}) => {
    config = generateConfig(config)

    const audio = useMemo<HTMLAudioElement | undefined>(() => sound ? new Audio(sound) : undefined, [sound])
    const play = useCallback(() => audio?.play(), [audio])
    const pause = useCallback(() => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }, [sound]);

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
}
