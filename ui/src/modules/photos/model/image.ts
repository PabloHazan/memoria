import { ImageSrc } from './imageSrc';

export interface Image {
    name: string;
    url: ImageSrc;
    sound: string | undefined;
}
