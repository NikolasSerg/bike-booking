import {loadBikesAction, addBikeAction, removeBikeAction} from '../bikeReducer';
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
        await fetch('http://localhost:5000/admin/')
            .then(res => res.json())
            .then(data => newData = data)

        dispatch(loadBikesAction(newData))
    }
}

export const addBike = (bike) => {
    return async (dispatch) => {
        await fetch('http://localhost:5000/admin/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json;chapter=utf-8'},
                body: JSON.stringify(bike)
            }
        )
        dispatch(addBikeAction(bike))
    }
}
export const removeBike = (id) => {
    return async (dispatch) => {
        await fetch('http://localhost:5000/admin/', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json;chapter=utf-8'},
                body: JSON.stringify({id})
            }
        )
        dispatch(removeBikeAction({id}))
    }
}
