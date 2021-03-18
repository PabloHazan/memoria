import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { dispatch } from './core/redux/store';
import { loadingOff, loadingOn } from './shared/loader/redux/loaderAction';

Axios.defaults.baseURL = '/api/';
// Axios.defaults.baseURL = 'http://192.168.0.98:8080/api/';


const requestHandler = async (request: AxiosRequestConfig) => {
    dispatch(loadingOn());
    return request
}

const responseHandler = (response: AxiosResponse): AxiosResponse => {
    dispatch(loadingOff());
    return response;
}

const errorHandler = (error: any) => {
    responseHandler(error.response);
    return Promise.reject(error);
}

Axios.interceptors.request.use(
    request => requestHandler(request)
)

Axios.interceptors.response.use(
    response => responseHandler(response),
    error => errorHandler(error)
)
