import React from 'react';
import Photo from './Photo';
import { useFetchImage } from '../../hooks/fetchImage.hook';
import { useParams } from 'react-router-dom';

interface PhotoParams {
    name: string
}


const PhotoContainer = (props: any) => {
    const { name } = useParams<PhotoParams>();
    const image = useFetchImage(atob(name));
    debugger
    return <Photo
        {...props}
        image={image}
    />
}

export default PhotoContainer;