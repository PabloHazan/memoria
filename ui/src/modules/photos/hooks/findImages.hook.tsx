import React, { useEffect, useState } from "react"
import axios from "axios";
import { Image } from "../model/image";

interface PhotoResponse {
    images: Array<Image>;
    backgroundImage: string;
}

export const useFindImages = (): PhotoResponse | null => {
    const [images, setImages] = useState<PhotoResponse | null>(null);
    useEffect(() => {
        axios
            .get<PhotoResponse>('photos')
            .then(({ data }) => setImages(data));
    }, [])
    return images;
}