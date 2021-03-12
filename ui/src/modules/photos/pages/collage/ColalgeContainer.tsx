import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useFindImages } from '../../hooks/findImages.hook';
import Collage from './Collage';
import { PHOTO_PATH } from '../../../../App.routes';
import { ImageSrc } from '../../model/imageSrc';


const CollageContainer = (props: any) => {
    const findImages = useFindImages();

    const history = useHistory();
    const showImage = useCallback((src: ImageSrc, path: string) => history.push(PHOTO_PATH(src, btoa(path))), []);
    return <Collage
        {...props}
        images={findImages?.images}
        roundImages={findImages?.round}
        backgroundImagePath={findImages?.backgroundImage}
        imagesByRow={findImages?.imagesByRow}
        showImage={showImage}
    />
}

export default CollageContainer
