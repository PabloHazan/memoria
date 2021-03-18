import React, { useEffect } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import styled from 'styled-components';
import { useAudio } from '../../hooks/useAudio.hook';
import { Image } from '../../model/image';

const Img = styled.img`
    max-width: 100vh;
    max-height: 75vh;
    height: auto;
    width: auto;
`

const P = styled.p`
    font-size: 18px;
    line-height: 1.4;
    color: #d7b221;
    font-family: "Archivo Narrow","Helvetica Neue",Helvetica,Arial,sans-serif;
`;

interface PhotoProps {
    image: Image,
    next: () => void;
    back: () => void;
    clean: () => void;
}

const Photo = ({ image, next, back, clean }: PhotoProps) => {
    useAudio(image?.sound);
    useEffect(() => clean, [])
    return <>
        <Grid
            container
            direction='column'
            alignItems='center'
        >
            <P>{image?.name.match(/^[0-9]+-(.*)\.jpg$/)?.[1] ?? ''}</P>
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
