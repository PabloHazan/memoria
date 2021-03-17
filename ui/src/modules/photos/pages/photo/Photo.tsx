import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAudio } from '../../hooks/useAudio.hook';
import { Image } from '../../model/image';

const Img = styled.img`
    max-width: 100vh;
    max-height: 80vh;
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
    image: Image
}

const Photo = ({ image }: PhotoProps) => {
    useAudio(image?.sound);
    return <>
        <P>{image?.name.match(/^[0-9]+-(.*)\.jpg$/)?.[1] ?? ''}</P>
        {image?.url && <Img src={image.url} />}
    </>
}
export default Photo;
