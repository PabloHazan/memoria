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
        url={backgroundImagePath}
        container
        direction='row'
        justify='flex-start'
        alignItems='center'
        wrap='wrap'
    >
        {images?.map(({ name, url }) =>
            <Img src={url} width="5%" onClick={() => showImage(name)} />
        )}
    </GridBackgroundImage>
</>

export default Collage;