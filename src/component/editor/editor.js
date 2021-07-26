import React from "react";
import './editor.css';
import {useSelector} from "react-redux";

export default function Editor () {
    const total = useSelector(state => state.bike.bike.length);
    const available = useSelector(state => {
        const sumItem = state.bike.bike.filter(item => {
            if(item.status === 'available') {
                return item
            }
        });
        console.log(sumItem, ' - sumItem');
        return  sumItem.length;
    });
    const busy = useSelector(state => {
        const sumItem = state.bike.bike.filter(item => {
            if(item.status === 'busy') {
                return item
            }
        });
        console.log(sumItem, ' - sumItem');
        return  sumItem.length;
    });
    const avaragePrice = useSelector(state => {
        let prices = state.bike.bike.reduce((accumulator, current) => {
            return accumulator + +current.price
        }, 0)
        console.log(prices, ' - sumItem');
        return  Math.floor(prices/Number(total));
    });


    return(
        <div className='container col editor'  style={{backgroundColor: '#fff'}}>
            <div className='inputBlock container row fw'>
                <input type="text" placeholder='Name'/>
                <input type="text" placeholder='Type'/>
                <input type="text" placeholder='Color'/>
                <input type="text" placeholder='Wheel size'/>
                <input type="text" placeholder='Price'/>
                <input type="text" placeholder='ID: XXXXXX'/>
                <textarea cols="30" rows="4" placeholder='Description'></textarea>
                <button className='container jcc aic'>SAVE</button>
                <button className='container jcc aic'>CLEAR</button>
            </div>
            <div className='static'>
                <h3>STATISTIC</h3>
                <p>Total Bikes: <span>{total}</span></p>
                <p>Available Bikes: <span>{available}</span></p>
                <p>Booked Bikes: <span>{busy}</span></p>
                <p>Avarage bikes cost: <span>{avaragePrice}</span> UAH/hr</p>
            </div>
        </div>
    )
}