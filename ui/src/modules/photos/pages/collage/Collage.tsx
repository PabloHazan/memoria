import React from 'react';
import { GridBackgroundImage, Img, Round, ImgRound, Section, H2 } from './CollageStyle'
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
    <Grid
        container
    >
        <Grid item xs={12} sm={8}>
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
        </Grid>
        <Grid item xs>
            <Section>
                <H2>ACTIVIDAD 2021</H2>
                <div><p>
                    Compartimos el Collage del Pañuelo. Este año nuestro Homenaje a la Memoria es desde casa. Las fotos que lo integran fueron enviadas a nuestro contacto. Es nuestro homenaje a ellas y a sus hijos. A ellas que, como dijera Galeano, se negaron a olvidar aún en tiempos de amnesia obligatoria. Si los delitos de lesa humanidad no prescriben, la resistencia tampoco.
                </p></div>
            </Section>
        </Grid>
    </Grid>
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