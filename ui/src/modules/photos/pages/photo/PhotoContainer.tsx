import React, { useCallback } from 'react';
import Photo from './Photo';
import { useFetchImage } from '../../hooks/fetchImage.hook';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCollage, selectPhotos } from '../../redux/photos.selector';
import { PHOTO_PATH } from '../../../../App.routes';
import { ImageSrc } from '../../model/imageSrc';
import { setSelectedPhoto } from '../../redux/photos.action';

interface PhotoParams {
    name: string;
    src: string;
}

const PhotoContainer = (props: any) => {
    const dispatch = useDispatch();
    const clean = useCallback(() => dispatch(setSelectedPhoto()), [dispatch]);

    const { src, name } = useParams<PhotoParams>();
    const history = useHistory();

    const image = useFetchImage(atob(name), src);
    const photos = useSelector(selectPhotos);
    const collage = useSelector(selectCollage);

    const next = useCallback(() => {
        const index = photos.findIndex((photo) => photo.name === image!.name) + 1;
        clean();
        const newImage = photos[index === photos.length ? 0 : index];
        const newSrc: ImageSrc = collage.some(photo => photo.name === newImage.name) ?
            ImageSrc.COLLAGE_SRC :
            ImageSrc.ROUND_SRC;
        history.push(PHOTO_PATH(newSrc, btoa(newImage.name)))
    }, [photos, image]);
    const back = useCallback(() => {
        const index = photos.findIndex((photo) => photo.name === image!.name) - 1;
        clean();
        const newImage = photos[index === -1 ? photos.length - 1 : index];
        const newSrc: ImageSrc = collage.some(photo => photo.name === newImage.name) ?
            ImageSrc.COLLAGE_SRC :
            ImageSrc.ROUND_SRC;
        history.push(PHOTO_PATH(newSrc, btoa(newImage.name)))
    }, [photos, image]);

    return <Photo
        {...props}
        image={image}
        next={next}
        back={back}
        clean={clean}
    />
}

export default PhotoContainer;