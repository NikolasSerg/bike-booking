import {loadBikesAction, addBikeAction, removeBikeAction, changeStatusAction} from '../bikeReducer';

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
export const updateBike = (bike) => {
    return async (dispatch) => {
        await fetch('http://localhost:5000/admin/', {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json;chapter=utf-8'},
                body: JSON.stringify(bike)
            }
        )
        dispatch(changeStatusAction(bike))
    }
}
