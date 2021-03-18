import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../../reducer';

export const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export const dispatch = (action: any) => store.dispatch(action);
