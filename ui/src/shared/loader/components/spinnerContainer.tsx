import React from 'react'
import { useSelector } from 'react-redux';
import { Spinner } from './spinner';
import { selectIsLoading } from '../redux/loaderSelector';

const SpinnerContainer = (props: any) => {
    const isLoading = useSelector(selectIsLoading)
    return <Spinner {...props} loading={isLoading} />
}

export default SpinnerContainer;