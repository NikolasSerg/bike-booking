import React, {useState} from "react";
import './editor.css';
import {useDispatch, useSelector} from "react-redux";
import {addBikeAction} from "../../store/bikeReducer";

export default function Editor () {
    const initialState = {
        bike: {
            name: '',
            type: '',
            color: '',
            wheel: '',
            price: '',
            id: '',
            description: ''
        }

    }
    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();

    const total = useSelector(state => state.bike.bike);
    const available = useSelector(state => {
        const sumItem = state.bike.bike.filter(item => {
            if(item.status === 'available') {
                return item
            }
        });
        return  sumItem.length;
    });
    const busy = useSelector(state => {
        const sumItem = state.bike.bike.filter(item => {
            if(item.status === 'busy') {
                return item
            }
        });
        return  sumItem.length;
    });
    const avaragePrice = useSelector(state => {
        let prices = state.bike.bike.reduce((accumulator, current) => {
            return accumulator + +current.price
        }, 0)
        return  Math.floor(prices/Number(total.length));
    });


    const idRef = React.createRef();


    const onHandleChangeInput = (event) => {
        console.log(state, ' - state')
        // console.log(event.target, ' - event.target');
        switch (event.target.name) {
            case 'name':
                let newName = {...state}
                newName.bike.name = event.target.value;
                setState(newName)
                break
            case 'type':
                let newType = {...state};
                console.log(event.target.value, ' - SELECT value')
                newType.bike.type = event.target.value;
                setState(newType)
                break
            case 'color':
                let newColor = {...state};
                newColor.bike.color = event.target.value;
                setState(newColor)
                break
            case 'wheel':
                let newWheel = {...state};
                newWheel.bike.wheel = event.target.value;
                setState(newWheel)
                break
            case 'price':
                let newPrice = {...state};
                newPrice.bike.price = parseInt(event.target.value);
                setState(newPrice)
                break
            case 'id':
                let newId = {...state};
                newId.bike.id = event.target.value;
                setState(newId)
                break
            case 'description':
                let newDescription = {...state};
                newDescription.bike.description = event.target.value;
                setState(newDescription)
                break
        }
    }
    const onHandlePurposeId = () => {

        if(state.bike.id === '') {
            let id = new Date().getTime();
            idRef.current.value = id;
            let newId = {...state};
            console.log(newId)
            newId.bike.id = id;
            setState(newId);
        }
    }
    // const onHandleInputColor = (event) => {
    //     // console.log(event.target.color, ' - color func')
    //     //  setState(state => ({...state, color: event.target.value}))
    //     // console.log(state, ' - STATE')
    //  поки непотрібно}


    const onHandleSubmit = (event) => {
        event.preventDefault();
        console.log(state, ' - state');
        // eslint-disable-next-line no-undef
        let newBike = {...state};
        console.log(newBike)
        dispatch(addBikeAction(newBike.bike));
        handleClear();
    }
    const handleClear = () => {
        setState(initialState)
    }
    const onHandleClear = (event) => {
        handleClear()
    }

    return(
        <div className='container col editor'  style={{backgroundColor: '#fff'}}>
            <form className='inputBlock container row fw' onSubmit={onHandleSubmit} onChange={(event) => onHandleChangeInput(event)}>
                <input type="text" name='name' placeholder='Name' value={state.bike.name}/>
                {/*<input type="text" name='type' placeholder='Type'value={state.bike.type}/>*/}
                <select name='type' value={state.bike.type}>
                    <option value="kids">kids</option>
                    <option value="mountain">mountain</option>
                    <option value="highway">highway</option>
                    <option value="women's">women's</option>
                    <option value="scooter">scooter</option>
                </select>
                <input type="color" name='color' placeholder='Color' style={{padding: 0}} title='change color' value={state.bike.color}/>
                <input type="text" name='wheel' placeholder='Wheel size' value={state.bike.wheel}/>
                <input type="number" name='price' placeholder='Price' value={state.bike.price}/>
                <input type="text" name='id' placeholder='ID: XXXXXX' title='input only integers number' onFocus={onHandlePurposeId} ref={idRef} value={state.bike.id}/>
                <textarea cols="30" rows="4" name='description' placeholder='Description' value={state.bike.description}></textarea>
                <button type='submit' className='container jcc aic'>SAVE</button>
                <button className='container jcc aic' onClick={onHandleClear}>CLEAR</button>
            </form>
            <div className='static'>
                <h3>STATISTIC</h3>
                <p>Total Bikes: <span>{total.length}</span></p>
                <p>Available Bikes: <span>{available}</span></p>
                <p>Booked Bikes: <span>{busy}</span></p>
                <p>Avarage bikes cost: <span>{avaragePrice}</span> UAH/hr</p>
            </div>
        </div>
    )
}