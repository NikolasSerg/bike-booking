import React from "react";
import Bike from "../bike";
import {useDispatch, useSelector} from "react-redux";
import {fetchBikes} from '../../store/asyncAction/bike';


export default function BikeList() {
    const dispatch = useDispatch();
    const bikes = useSelector(state => state.bike.bike);
    console.log(bikes, ' - bikes');



    return (
        <>
            <button onClick={() => dispatch(fetchBikes())}>load</button>
            <ul>
                <Bike/>
            </ul>
        </>

    )
}