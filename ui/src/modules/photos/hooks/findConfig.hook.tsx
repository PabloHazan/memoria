import React, { useEffect } from "react"
import axios from "axios";
import { Image } from "../model/image";
import { useDispatch, useSelector } from "react-redux";
import { selectHome } from "../redux/photos.selector";
import { setHome } from "../redux/photos.action";

export interface Config {
    images: Array<Image>;
    round: Array<Image>;
    backgroundImage: string;
    imagesByRow: number;
    sound: string;
}

export const useFindConfig = (): Config | null => {
    const dispatch = useDispatch();
    const home = useSelector(selectHome);
    useEffect(() => {
        if (!home) {
            axios
                .get<Config>('photos')
                .then(({ data }) => {
                    dispatch(setHome(data));
                });
        }
    }, [])
    return home;
}