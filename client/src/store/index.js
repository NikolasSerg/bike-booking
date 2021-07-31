import {createStore, combineReducers, applyMiddleware} from 'redux';
import {bikeReducer} from './bikeReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    bike: bikeReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))