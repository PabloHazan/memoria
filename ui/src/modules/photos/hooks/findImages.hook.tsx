import React, { useEffect, useState } from "react"
import axios from "axios";
import { Image } from "../model/image";
import { setUrls } from "../../../core/statics/staticLoader";

interface PhotoResponse {
    images: Array<Image>;
    round: Array<Image>;
    backgroundImage: string;
    imagesByRow: number;
    sound: string;
}

export const useFindImages = (): PhotoResponse | null => {
    const [images, setImages] = useState<PhotoResponse | null>(null);
    useEffect(() => {
        axios
            .get<PhotoResponse>('photos')
            .then(({ data }) => {
                setUrls([
                    data.backgroundImage,
                    data.sound,
                    ...data.images.map(({ url }) => url),
                    ...data.round.map(({ url }) => url),
                ]);
                setImages(data);
            });
    }, [])
    return images;
}