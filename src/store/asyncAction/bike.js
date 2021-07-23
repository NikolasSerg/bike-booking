import {loadBikesAction} from '../bikeReducer';
import db from '../../db.json';

export const fetchBikes = (dispatch) => {
    return (dispatch) => {
        dispatch(loadBikesAction(db))
    }
}