import React from 'react';
import { Grid } from "@material-ui/core";
import styled from 'styled-components';

export const GridBackgroundImage = styled(Grid)`
    background-image: url(${({ url }: { url: string | null }) => url});
    background-repeat: no-repeat;
    background-size: 100%;
    width: 100%;
    overflow: hidden;
`;

export const Img = styled.img`
    opacity: 0.0;
    transition: transform 0.2s;
    &:hover {
        transform: scale(1.5);
        opacity: 0.85;
        z-index: 2;
        /* border-style: solid;
        border-width: 5px;
        border-color: white; */
    }
`

export const Section = styled.section`
    margin: 0 20px 1.6em;
    padding: 1.6em;
    background: #eeece8;
    font-size: 18px;
    line-height: 1.4;
    color: #A7CCD6;
    font-family: "Archivo Narrow","Helvetica Neue",Helvetica,Arial,sans-serif;
`

export const H2 = styled.h2`
    font-size: 24px;
    margin: 0 0 .8em;
    line-height: 1.1;
`

export const Round = styled(Grid)`
    overflow-x: auto;
    overflow-y: hidden;
    &&::-webkit-scrollbar-track {
        border: 1px solid #A7CCD6;
        padding: 2px 0;
        background-color: #e3eef1;
    }

    &&::-webkit-scrollbar {
        width: 10px;
    }

    &&::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #A7CCD6;
        border: 1px solid #d7b221;
    }
`

export const ImgRound = styled.img`
    transition: transform 0.2s;
    width: 100%;
    max-width: 15vh;
    height: auto;
    &:hover {
        transform: scale(1.5);
        z-index: 2;
    }
`
