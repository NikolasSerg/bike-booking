import {createStore, combineReducers, applyMiddleware} from 'redux';
import {bikeReducer} from './bikeReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    bike: bikeReducer
})

export const store =createStore(rootReducer, applyMiddleware(thunk))