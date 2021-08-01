import {loadBikesAction, addBikeAction} from '../bikeReducer';
import db from '../../db.json';
import localforage from "localforage";

// export const fetchBikes =  (dispatch) => {
//     return async (dispatch) => {
//         let newData = '';
//         await localforage.getItem('bikes').then(data => {
//             if(data === null) {
//                 newData = db;
//                 console.log('db')
//             } else {
//                 newData = data;
//                 console.log('data')
//             }
//         }).catch(err => console.error(err))
//         dispatch(loadBikesAction(newData))
//     }
// }


export const fetchBikes = () => {
    return async (dispatch) => {
        let newData = [];
        await fetch('http://localhost:5000/admin/bikes')
            .then(res => res.json())
            .then(data => newData = data)

        dispatch(loadBikesAction(newData))
    }
}

export const addBike = (bike) => {
    return async (dispatch) => {
        await fetch('http://localhost:5000/admin/add', {
                method: 'POST',
                headers: {'Content-Type': 'application/json;chapter=utf-8'},
                body: JSON.stringify(bike)
            }
        )
        dispatch(addBikeAction(bike))
    }
}
export const updateBike = (bike) => {
    return async (dispatch) => {
        await fetch('http://localhost:5000/admin/add', {
                method: 'POST',
                headers: {'Content-Type': 'application/json;chapter=utf-8'},
                body: JSON.stringify(bike)
            }
        )
        dispatch(addBikeAction(bike))
    }
}