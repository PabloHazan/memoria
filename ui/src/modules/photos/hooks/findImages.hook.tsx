import React, { useEffect } from "react"
import axios from "axios";
import { Image } from "../model/image";
import { useDispatch, useSelector } from "react-redux";
import { selectHome } from "../redux/photos.selector";
import { setHome } from "../redux/photos.action";

export interface HomeStructure {
    images: Array<Image>;
    round: Array<Image>;
    backgroundImage: string;
    imagesByRow: number;
    sound: string;
}

export const useFindImages = (): HomeStructure | null => {
    const dispatch = useDispatch();
    const images = useSelector(selectHome);
    useEffect(() => {
        if (!images) {
            axios
                .get<HomeStructure>('photos')
                .then(({ data }) => {
                    dispatch(setHome(data));
                });
        }
    }, [])
    return images;
}