import React, { useEffect } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import { useAudio } from '../../hooks/useAudio.hook';
import { Image } from '../../model/image';
import { Img, P } from './PhotoStyle';
import { useGlobalAudio } from '../../../../AppContext';

interface PhotoProps {
    image: Image,
    next: () => void;
    back: () => void;
    clean: () => void;
}

const Photo = ({ image, next, back, clean }: PhotoProps) => {
    const { setVolume } = useGlobalAudio();

    const { isPlaying } = useAudio(image?.sound);
    useEffect(() => {
        if (isPlaying) {
            setVolume(0.5);
            return () => setVolume(1);
        }
    }, [isPlaying])

    useEffect(() => clean, [])
    return <>
        <Grid
            container
            direction='column'
            alignItems='center'
        >
            <P>{image?.name.match(/^[A-Z,a-z,0-9]+-(.*)\.jpg$/)?.[1] ?? ''}</P>
        </Grid>
        <Grid item>
            <Grid
                item
                container
                direction='row'
                alignItems='center'
                justify='center'
                spacing={3}
            >
                <Grid item>
                    <IconButton onClick={back}>
                        <NavigateBefore />
                    </IconButton>
                </Grid>
                <Grid item>
                    {image?.url && <Img src={image.url} />}
                </Grid>
                <Grid item>
                    <IconButton onClick={next}>
                        <NavigateNext />
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    </>
}
export default Photo;
