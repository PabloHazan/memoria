import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useFindConfig } from '../../hooks/findConfig.hook';
import Collage from './Collage';
import { PHOTO_PATH } from '../../../../App.routes';
import { ImageSrc } from '../../model/imageSrc';


const CollageContainer = ({ props }: any) => {
    const config = useFindConfig();

    const history = useHistory();
    const showImage = useCallback((src: ImageSrc, path: string) => {
        history.push(PHOTO_PATH(src, btoa(path)));
    }, []);
    return <Collage
        {...props}
        images={config?.images}
        roundImages={config?.round}
        backgroundImagePath={config?.backgroundImage}
        imagesByRow={config?.imagesByRow}
        showImage={showImage}
        sound={config?.sound}
    />
}

export default CollageContainer
