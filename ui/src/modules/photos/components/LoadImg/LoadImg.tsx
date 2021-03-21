import { useEffect } from "react"

interface LoadImgProps {
    src: string;
    loadingOn: () => void;
    loadingOff: () => void;
    [more: string]: any;
}

export const LoadImg = ({ src, loadingOn, loadingOff, ...more }: LoadImgProps) => {
    useEffect(() => {
        if (src) {
            loadingOn();
        }
    }, [src])
    return <img
        {...more}
        src={src}
        onLoad={loadingOff}
        onError={loadingOff}
    />
}