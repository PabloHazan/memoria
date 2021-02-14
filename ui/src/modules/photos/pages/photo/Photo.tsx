import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

interface PhotoProps {
}

interface PhotoParams {
    path: string
}


const Photo = ({ }: PhotoProps) => {
    const { path } = useParams<PhotoParams>();
    const realPath = useMemo(() => atob(path), [path])
    return <>
        <img width="100%" src={realPath} />
    </>
}

export default Photo;
