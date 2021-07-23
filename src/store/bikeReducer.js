import db from '../db.json';
import {config} from '../config';
const defaultState = {
    bike: db
}

export const bikeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case config.ADD_BIKE:
            return {...state, bike: [...state.bike, action.payload]}
        case config.REMOVE_BIKE:
            return {...state, bike: state.bike.filter((item) => item.id !== action.payload)}
        default:
            return state
    }
}
export const addBikeAction = (payload) => ({type: config.ADD_BIKE, payload})
export const removeBikeAction = (payload) => ({type: config.REMOVE_BIKE, payload})