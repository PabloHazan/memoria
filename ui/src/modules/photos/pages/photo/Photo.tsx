import React from 'react';
import { Image } from '../../model/image';

interface PhotoProps {
    image: Image
}



const Photo = ({ image }: PhotoProps) => {
    return <>
       {image?.url && <img width="100%" src={image.url} />}
    </>
}

export default Photo;
