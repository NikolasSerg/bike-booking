import React, {useEffect} from "react";
import './bike.css';
import {useDispatch} from "react-redux";
import {changeStatusAction} from '../../store/bikeReducer';




export default function Bike(props) {
    const dispatch = useDispatch();

    let {id, name, type, color, status, price} = props.bike;
    const onHandleChange = (event) => {
        console.log('change');
        console.log(event.target.value, ' - value')
        console.log(event.target.id, ' - id')
        dispatch(changeStatusAction({id: event.target.id, select: event.target.value}));
        // console.log(border, ' - border', status, ' - status')
    }

    useEffect(() => {
        console.log(border, ' - border', status, ' - status');
        if(status === 'available') {
            border = {borderColor: 'green'};
            console.log(border, ' - border')
        }
        if(status === 'unavailable') {
            border = {borderColor: 'brown'};
            console.log(border, ' - border');
        }
        if(status === 'busy') {
            border = {borderColor: 'red'};
            console.log(border, ' - border');
        }
    })
    let border = '';

    return (
        <li className='container col jcsb bikeItem' style={{backgroundColor: color}}>
            <div className='container'>
                <div className="container row fw jcsb name">
                    <div style={{fontWeight: 600}}>NAME: {name}</div>
                    <div>TYPE: {type}</div>
                </div>
                <span className='close'>&#215;</span>
            </div>
            <div className="container row aic">
                <span>COLOR: </span>
                <div className='colorPiker' style={{backgroundColor: color}}>{color}</div>
            </div>
            <div style={{fontSize: '10px'}}>
                ID: <span>{id}</span>
            </div>
            <div className='container row jcsb'>
                <div className='container row jcsb aic' style={{width: '170px'}}>
                    <span> STATUS: </span>
                    <select value={status} className='select' id={id} onChange={onHandleChange}>
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                        <option value="busy">Busy</option>
                    </select>
                </div>
                <div style={{fontSize: '24px'}}>
                    <span  style={{fontWeight: '600'}}>{price}</span><span>UAH/hr</span>
                </div>
            </div>
        </li>
    )
}