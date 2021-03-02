import React from 'react';
import { Grid } from "@material-ui/core";
import styled from 'styled-components';

export const GridBackgroundImage = styled(Grid)`
    background-image: url(${({ url }: { url: string | null }) => url});
    background-repeat: no-repeat;
    background-size: 100%;
    width: 100%;
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