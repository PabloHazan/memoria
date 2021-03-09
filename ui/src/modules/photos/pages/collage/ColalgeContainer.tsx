import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useFindImages } from '../../hooks/findImages.hook';
import Collage from './Collage';
import { PHOTO_PATH } from '../../../../App.routes';


const CollageContainer = (props: any) => {
    const findImages = useFindImages();

    const history = useHistory();
    const showImage = useCallback((path: string) => history.push(PHOTO_PATH(btoa(path))), []);
    return <Collage
        {...props}
        images={findImages?.images}
        backgroundImagePath={findImages?.backgroundImage}
        imagesByRow={findImages?.imagesByRow}
        showImage={showImage}
    />
}

export default CollageContainer
