import React, {useState} from "react";
import './bike.css';
import {changeStatusAction, removeBikeAction} from '../../store/bikeReducer';
import {useDispatch} from "react-redux";


export default function Bike(props) {
// обновить/
    const dispatch = useDispatch();
    const onHandleChange = (event) => {
        console.log( ' ID in change');
        console.log(event.target.value, ' - event.target.value');
        dispatch(changeStatusAction({_id: event.target.id, select: event.target.value}))
    }
    const onHandleRemove = (id) => {
        console.log(id, ' - id target remove');
        dispatch(removeBikeAction({id}))

    }

    return (
        <li className={`container col jcsb bikeItem ${props.bike.status}`} >
            <div className='container'>
                <div className="container row fw jcsb name">
                    <div style={{fontWeight: 600}}><span
                        style={{marginRight: '1rem'}}>NAME: </span>{props.bike.name}</div>
                    <div><span style={{marginRight: '1rem'}}>TYPE: </span>{props.bike.type}</div>
                </div>
                <span className='close' onClick={() => onHandleRemove(props.bike._id)}>&#215;</span>
            </div>
            <div className="container row aic">
                <span style={{marginRight: '1rem'}}>COLOR: </span>
                <div className='colorPiker'
                     style={{backgroundColor: props.bike.color}}></div>
            </div>
            <div style={{fontSize: '10px'}}>
                <span style={{marginRight: '1rem'}}>ID: </span><span>{props.bike._id}</span>
            </div>
            <div className='container row jcsb'>
                <div className='container row jcsb aic' style={{width: '170px'}}>
                    <span> STATUS: </span>
                    <select value={props.bike.status} className='select' id={props.bike._id}
                            onChange={(event) => onHandleChange(event)}>
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                        <option value="busy">Busy</option>
                    </select>
                </div>
                <div style={{fontSize: '24px'}}>
                    <span style={{fontWeight: '600'}}>{props.bike.price}</span><span>UAH/hr</span>
                </div>
            </div>
        </li>
    )
}

// const mapDispatchToProps = (dispatch) => ({
//     changeStatus: (event) => dispatch(changeStatusAction({id: event.target.id, select: event.target.value})),
//     remoteBike: (id) => dispatch(removeBikeAction({id})),
// })








