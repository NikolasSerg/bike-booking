import React from "react";
import Bike from "../bike/bike";
import {useDispatch, useSelector} from "react-redux";
import {fetchBikes} from '../../store/asyncAction/bike';
import './bikeList.css';


export default function BikeList() {
    const dispatch = useDispatch();
    const bikes = useSelector(state => state.bike.bike);

    if (bikes.length > 0) {
        return (
            <div className='bikeList'>
                <ul>
                    {bikes.map((item, index) => {
                        return <Bike bike={item} key={index}/>
                    })}

                </ul>
            </div>

        )
    } else {
        return (
            <div className='container col jcc bikeList'>
                <button className='btn' onClick={() => dispatch(fetchBikes())}>LOAD data</button>
            </div>

        )
    }
}