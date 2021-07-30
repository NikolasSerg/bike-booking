import {config} from '../config';
import localforage from "localforage";

// localforage.getItem('bike');
const defaultState = {
    bike: []
}

const {ADD_BIKE, REMOVE_BIKE, LOAD_BIKES, SELECT_BIKES} = config.reducers;

export const bikeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_BIKE:
            return {...state, bike: [...state.bike, action.payload]};
        case REMOVE_BIKE:
            return {...state, bike: state.bike.filter((item) => item.id !== action.payload.id)}
        case LOAD_BIKES:
            return {...state, bike: [...action.payload]}
        case SELECT_BIKES:
            console.log(action.payload, ' - ')
            return {
                ...state,
                bike: state.bike.map(
                    item => {
                        if (item.id == action.payload.id) {
                            item.status = action.payload.select
                        }
                        return item
                    }
                )
            }
        default:
            return state
    }
}
export const addBikeAction = (payload) => ({type: ADD_BIKE, payload})
export const removeBikeAction = (payload) => ({type: REMOVE_BIKE, payload})
export const loadBikesAction = (payload) => ({type: LOAD_BIKES, payload})
export const changeStatusAction = (payload) => ({type: SELECT_BIKES, payload})