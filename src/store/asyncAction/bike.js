import {loadBikesAction} from '../bikeReducer';
import db from '../../db.json';
import localforage from "localforage";

export const fetchBikes =  (dispatch) => {
    return async (dispatch) => {
        let newData = '';
        await localforage.getItem('bikes').then(data => {
            if(data === null) {
                newData = db;
                console.log('db')
            } else {
                newData = data;
                console.log('data')
            }
        }).catch(err => console.error(err))
        dispatch(loadBikesAction(newData))
    }
}