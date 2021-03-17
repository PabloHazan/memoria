import React, { useState } from 'react';
import { GridBackgroundImage, Img, Round, ImgRound, Section, H2 } from './CollageStyle'
import { Image } from '../../model/image';
import { ImageSrc } from '../../model/imageSrc';
import { Grid, IconButton } from '@material-ui/core';
import { useAudio } from '../../hooks/useAudio.hook';
import { PhotoSizeSelectLarge, PhotoSizeSelectSmall, ZoomIn, ZoomOut } from '@material-ui/icons';

interface CollageProps {
    images: Array<Image> | null;
    roundImages: Array<Image> | null;
    backgroundImagePath: string | null;
    showImage: (src: ImageSrc, path: string) => void;
    imagesByRow: number;
    sound: string;
}

const Collage = ({ images, backgroundImagePath, showImage, imagesByRow, roundImages, sound }: CollageProps) => {
    useAudio(sound, { repeat: true });
    const [maximize, setMaximize] = useState(false);
    const Icon = maximize ? ZoomOut : ZoomIn;
    return <>
        <Grid
            container
            direction='column'
            spacing={3}
        >
            <Grid
                item
                container
                wrap='wrap'
                alignContent='space-between'
                spacing={3}
            >
                <Grid
                    item
                    sm={12} md={maximize ? 12 : 8}
                    container
                    direction='column'
                >
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
                            <Img
                                key={name}
                                src={url}
                                width={`${100 / imagesByRow}%`}
                                onClick={() => showImage(ImageSrc.COLLAGE_SRC, name)}
                            />
                        )}
                    </GridBackgroundImage>
                    <Grid
                        item
                        container
                        justify='flex-end'
                    >
                        <IconButton onClick={() => setMaximize(!maximize)}>
                            <Icon />
                        </IconButton>

                    </Grid>
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
            <Grid item>
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
            </Grid>
        </Grid>
    </>
}
export default Collage;