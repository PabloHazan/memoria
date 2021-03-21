import React from 'react';
import { CircularProgress, Backdrop } from '@material-ui/core';
import styled from 'styled-components';

interface ISpinnerProps {
    loading: boolean
}

const StyledBackdrop = styled(Backdrop)`
    color: '#fff';
    z-index: 10 !important;
`

export const Spinner = ({ loading }: ISpinnerProps) => (
    <StyledBackdrop open={loading} >
        <CircularProgress style={{ 'color': '#A7CCD6' }} />
    </StyledBackdrop>
)