import {loadBikesAction} from '../bikeReducer';
// import db from '../../db.json';
import localforage from "localforage";

localforage.getItem('bikes')
    .then(data => {
        console.log(data, ' - data')
        db = data
    })
let db = '';
// console.log(db, ' - DB')
export const fetchBikes = (dispatch) => {
    return (dispatch) => {
        // const db = localforage.getItem('bikes')
        dispatch(loadBikesAction(db))
    }
}