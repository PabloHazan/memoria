import React, { useEffect, useState } from "react"
import axios from "axios";
import { Image } from "../model/image";

interface PhotoResponse extends Image { }

export const useFetchImage = (name: string): PhotoResponse | null => {
    const [image, setImage] = useState<PhotoResponse | null>(null);
    useEffect(() => {
        axios
            .get<PhotoResponse>(`photos/${name}`)
            .then(({ data }) => setImage(data));
    }, [])
    return image;
}