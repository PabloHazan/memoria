import WebFont from 'webfontloader';

const webFontWrapper = <Params = any>(fun: (...params: Array<Params>) => any) => (...params: Array<Params>) => {
    fun(...params)
    WebFont.load({
        custom: {
            urls: getUrls(),
        },
        active: _successCallback,
        inactive: _errorCallback,
        classes: false
    });
}

let _urls: Array<string> = new Array<string>();
export const setUrls = webFontWrapper((urls: Array<string>) => _urls = urls);
const getUrls = (): Array<string> => _urls

let _successCallback: () => void;
let _errorCallback: () => void;

export const configStaticsLoading = (successCallback: () => void, errorCallback: () => void) => {
    _successCallback = successCallback;
    _errorCallback = errorCallback;
}
