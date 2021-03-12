import React from 'react';
import Photo from './Photo';
import { useFetchImage } from '../../hooks/fetchImage.hook';
import { useParams } from 'react-router-dom';

interface PhotoParams {
    name: string;
    src: string;
}


const PhotoContainer = (props: any) => {
    const { src, name } = useParams<PhotoParams>();
    const image = useFetchImage(atob(name), src);
    return <Photo
        {...props}
        image={image}
    />
}

export default PhotoContainer;