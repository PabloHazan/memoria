import React, { useEffect } from "react"
import axios from "axios";
import { Image } from "../model/image";
import { setUrls } from "../../../core/statics/staticLoader";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPhoto } from '../redux/photos.action';
import { selectCurrentImage } from "../redux/photos.selector";

interface PhotoResponse extends Image { }

export const useFetchImage = (name: string, src: string): PhotoResponse | null => {
    const dispatch = useDispatch();
    const image = useSelector(selectCurrentImage);
    useEffect(() => {
        axios
            .get<PhotoResponse>(`photos/${name}?src=${src}`)
            .then(({ data }) => {
                const urls: Array<string> = new Array<string>(data.url);
                if (data.sound) urls.push(data.sound);
                setUrls(urls);
                dispatch(setSelectedPhoto(data));
            });
    }, [name, src]);
    return image;
}