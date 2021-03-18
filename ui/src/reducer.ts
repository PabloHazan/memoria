import { photoReducer } from './modules/photos/redux/photos.reducer';
import { loaderReducer } from './shared/loader/redux/loaderReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    loader: loaderReducer,
    photo: photoReducer
})