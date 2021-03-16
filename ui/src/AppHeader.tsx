import { Grid } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
    width: 100%;
`

const A = styled.a`
    color: #d7b221;
    font-family: sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: block;
    font-weight: 700;
    text-decoration: none;
`

interface AppHeaderProps {

}

const AppHeader = ({ }: AppHeaderProps) => <Div>
    <Grid
        container
        justify='space-between'
        alignItems='center'>
        <img src='https://homenajealamemoria.files.wordpress.com/2021/03/isologos_180.png' />
        <A href="https://homenajealamemoria.wordpress.com/">Volver
        </A>
    </Grid>
</Div>

export default AppHeader;
