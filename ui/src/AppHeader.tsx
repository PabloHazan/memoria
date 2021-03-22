import React, { useCallback, useMemo } from 'react';
import { Grid } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';
import { COLLAGE_PATH } from './App.routes';

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
    cursor: pointer;
`

const Img = styled.img`
    cursor: pointer;
`

interface AppHeaderProps {

}

const AppHeader = ({ }: AppHeaderProps) => {
    const location = useLocation();
    const history = useHistory();
    const url = useMemo(() => location.pathname === COLLAGE_PATH ? "https://homenajealamemoria.wordpress.com/" : undefined, [location.pathname]);

    const goBack = useCallback(() => {
        if (!url) history.goBack();
    }, [url, history]);

    const goHome = useCallback(() => {
        history.push(COLLAGE_PATH);
    }, [history])

    return <>
        <Div>
            <Grid
                container
                justify='space-between'
                alignItems='center'>
                <Img src='https://homenajealamemoria.files.wordpress.com/2021/03/isologos_180.png' onClick={goHome} />
                <A
                    href={url}
                    onClick={goBack}
                >
                    Volver
                </A>
            </Grid>
        </Div >
    </>
}

export default AppHeader;
