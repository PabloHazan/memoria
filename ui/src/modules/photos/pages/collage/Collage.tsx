import React from 'react';
import { GridBackgroundImage, Img } from './CollageStyle'
import { Image } from '../../model/image';

interface CollageProps {
    images: Array<Image> | null;
    backgroundImagePath: string | null;
    showImage: (path: string) => void;
}


const Collage = ({ images, backgroundImagePath, showImage }: CollageProps) => <>
    <GridBackgroundImage
        imagePath={backgroundImagePath}
        container
        direction='row'
        justify='flex-start'
        alignItems='center'
        wrap='wrap'
    >
        {images?.map(({ miniaturePath, path }) =>
            <Img src={miniaturePath} width="20%" onClick={() => showImage(path)} />
        )}
    </GridBackgroundImage>
</>

export default Collage;