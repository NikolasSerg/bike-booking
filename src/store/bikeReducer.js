import {config} from '../config';
const defaultState = {
    bike: [
        {
            "id": 1,
            "name": "Cannondale F-SI Carbon 3",
            "type": "mountain",
            "color": "black",
            "wheelSize": 29,
            "img": "https://veloplaneta.ua/resize_1409x793x80/upload/iblock/1f8/9d56101c-53cc-11ea-b5e4-9f33bfe521cd_f3f2c1da-49b5-11eb-981a-834758a193ec.webp",
            "status": "Available",
            "price": 150
        },
        {
            "id": 2,
            "name": "Pride MARVEL 7.3",
            "type": "mountain",
            "color": "silver",
            "wheelSize": 27.5,
            "img": "https://veloplaneta.ua/resize_1409x793x80/upload/iblock/a4c/e1e252ee-b5fe-11ea-bf3a-c418c01191cd_9e27faa4-9158-11eb-981b-909c4f36594b.webp",
            "status": "Available",
            "price": 130
        }
    ]
}
const {ADD_BIKE, REMOVE_BIKE, LOAD_BIKES} = config.reducers;

export const bikeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_BIKE:
            return {...state, bike: [...state.bike, action.payload]}
        case REMOVE_BIKE:
            return {...state, bike: state.bike.filter((item) => item.id !== action.payload)}
        case LOAD_BIKES:
            return {...state, bike: [...state.bike, ...action.payload]}

        default:
            return state
    }
}
export const addBikeAction = (payload) => ({type: ADD_BIKE, payload})
export const removeBikeAction = (payload) => ({type: REMOVE_BIKE, payload})
export const loadBikesAction = (payload) => ({type: LOAD_BIKES, payload})