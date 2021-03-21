import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { loadingOff, loadingOn } from "../../../../shared/loader/redux/loaderAction";
import { LoadImg } from "./LoadImg";

const LoadImgContainer = (props: any) => {
    const dispatch = useDispatch();
    const loadingOnAction = useCallback(() => dispatch(loadingOn()), [dispatch]);
    const loadingOffAction = useCallback(() => dispatch(loadingOff()), [dispatch]);

    return <LoadImg
        loadingOn={loadingOnAction}
        loadingOff={loadingOffAction}
        {...props}

    />
}

export default LoadImgContainer;
