import React, { useState } from 'react';
import { GridBackgroundImage, Img, Round, ImgRound, Section, H2 } from './CollageStyle'
import { Image } from '../../model/image';
import { ImageSrc } from '../../model/imageSrc';
import { Grid, IconButton } from '@material-ui/core';
import { Pause, PlayArrow, ZoomIn, ZoomOut } from '@material-ui/icons';
import { useGlobalAudio } from '../../../../AppContext';

interface CollageProps {
    images: Array<Image> | null;
    roundImages: Array<Image> | null;
    backgroundImagePath: string | null;
    showImage: (src: ImageSrc, path: string) => void;
    imagesByRow: number;
}

const Collage = ({ images, backgroundImagePath, showImage, imagesByRow, roundImages }: CollageProps) => {
    const { isPlaying, toggle } = useGlobalAudio();
    const [maximize, setMaximize] = useState(false);
    const ZoomIcon = maximize ? ZoomOut : ZoomIn;
    const PlayingIcon = isPlaying ? Pause : PlayArrow;
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
                        <IconButton onClick={toggle}>
                            <PlayingIcon />
                        </IconButton>
                        <IconButton onClick={() => setMaximize(!maximize)}>
                            <ZoomIcon />
                        </IconButton>

                    </Grid>
                </Grid>
                <Grid item xs>
                    <Section>
                        <H2>Homenaje 2021</H2>
                        <div>
                            <p>
                                Pasando el mouse sobre cualquier parte de las imágenes podrás ver el detalle de cada fotografía enviada y haciendo click acceder a la misma.
                            </p>
                            <p>
                                Como todos los años contamos con el apoyo de las Madres y de otros Organismos de Derechos Humanos… No te pierdas encontrar sus fotos, una de ellas tiene el mensaje inolvidable que nos une todos los 24 de marzo.
                            </p>
                        </div>
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