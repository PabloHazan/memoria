import React from 'react';
import { GridBackgroundImage, Img, Round, ImgRound } from './CollageStyle'
import { Image } from '../../model/image';
import { ImageSrc } from '../../model/imageSrc';
import { Grid } from '@material-ui/core';


interface CollageProps {
    images: Array<Image> | null;
    roundImages: Array<Image> | null;
    backgroundImagePath: string | null;
    showImage: (src: ImageSrc, path: string) => void;
    imagesByRow: number;
}


const Collage = ({ images, backgroundImagePath, showImage, imagesByRow, roundImages }: CollageProps) => <>
    <GridBackgroundImage
        url={backgroundImagePath}
        container
        direction='row'
        justify='flex-start'
        alignItems='center'
        wrap='wrap'
        item
    >
        {images?.map(({ name, url }) =>
            <Img key={name} src={url} width={`${100 / imagesByRow}%`} onClick={() => showImage(ImageSrc.COLLAGE_SRC, name)} />
        )}
    </GridBackgroundImage>
    <Round
        item
        container
        direction='row'
        justify='flex-start'
        alignContent='center'
        wrap='nowrap'
    >
        {roundImages?.map(({ name, url }) =>
            <ImgRound src={url}
                key={name}
                onClick={() => showImage(ImageSrc.ROUND_SRC, name)}
            />
        )}
    </Round>
</>

export default Collage;