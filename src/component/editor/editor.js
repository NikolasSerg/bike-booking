import React, {useState} from "react";
import './editor.css';
import {useDispatch, useSelector} from "react-redux";
import {addBikeAction} from "../../store/bikeReducer";
import {logDOM} from "@testing-library/react";

export default function Editor() {
    const initialState = {
        bike: {
            name: {
                value: '',
                class: '',
                valid: false,
                message: ''
            },
            type: {
                value: '',
                class: '',
                valid: false,
                message: ''
            },
            color: {
                value: '',
                class: '',
                valid: false,
                message: 'dddddddddddddddddd'
            },
            wheel: {
                value: '',
                class: '',
                valid: false,
                message: ''
            },
            price: {
                value: '',
                class: '',
                valid: false,
                message: 'kkkkkkkkkkkkkk'
            },
            id: {
                value: '',
                class: '',
                valid: false,
                message: ''
            },
            description: {
                value: '',
                class: '',
                valid: false,
                message: ''
            }
        },
        submit: 'disabled',
    }
    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();

    const total = useSelector(state => state.bike.bike);
    // console.log(total, ' - total');
    // console.log(typeof total, ' -type total');
    // console.log(total[0].id, ' - total');
    const available = useSelector(state => {
        const sumItem = state.bike.bike.filter(item => {
            if (item.status === 'available') {
                return item
            }
        });
        return sumItem.length;
    });
    const busy = useSelector(state => {
        const sumItem = state.bike.bike.filter(item => {
            if (item.status === 'busy') {
                return item
            }
        });
        return sumItem.length;
    });
    const avaragePrice = useSelector(state => {
        let prices = state.bike.bike.reduce((accumulator, current) => {
            return accumulator + +current.price
        }, 0)
        return Math.floor(prices / Number(total.length));
    });

    const idRef = React.createRef();

    const onHandleChangeInput = async (event) => {
        switch (event.target.name) {
            case 'name':
                let newState = {...state}
                let name = event.target.value;
                let check = "";
                for (const item in total) {
                    if (item.name === name) {
                        check = true
                        break
                    } else {
                        check = false
                    }
                }

                if (check === false && name.length >= 5) {
                    newState.bike.name.valid = true;
                    newState.bike.name.class = 'success';
                    newState.bike.name.message = '';
                    setState(newState)
                } else if (check === true) {
                    newState.bike.name.valid = false;
                    newState.bike.name.message = 'this name exist';
                    newState.bike.name.class = 'error';
                    setState(newState)
                } else if (check === false && name.length < 5) {
                    newState.bike.name.valid = false;
                    newState.bike.name.message = 'name has to be minimum 5 characters';
                    newState.bike.name.class = 'error';
                    setState(newState);
                }
                console.log(check, ' - check')
                newState.bike.name.value = name;
                setState(newState)
                console.log(state.bike.name)
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
                console.log(state)
                break
            case 'description':
                let newDescription = {...state};
                newDescription.bike.description = event.target.value;
                setState(newDescription)
                break
        }
    }
    const onHandlePurposeId = () => {
        if (state.bike.id === '') {
            let id = new Date().getTime();
            idRef.current.value = id;
            let newId = {...state};
            newId.bike.id = id;
            setState(newId);
        }
    }

    const onHandleSubmit = async (event) => {
        event.preventDefault();
        console.log(state, ' - state');
        let newBike = {...state};
        let id = state.bike.id;
        let idExist = await total.find((item) => {
            if (Number(item.id) === Number(id)) {
                return item
            }
            return null
        })
        console.log(
            idExist !== null ? '1' : '0'
            , ' - idExist')

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
    const handleErrorMassage = (state) => {

    }

    return (
        <div className='container col editor' style={{backgroundColor: '#fff'}}>
            <form className='inputBlock container row fw' onSubmit={onHandleSubmit}
                  onChange={(event) => onHandleChangeInput(event)}>
                <input type="text" name='name' placeholder='Name' className={state.bike.name.class}
                       value={state.bike.name.value}/>
                {/*<input type="text" name='type' placeholder='Type'value={state.bike.type}/>*/}
                <select name='type' value={state.bike.type.value}>
                    <option value="kids">kids</option>
                    <option value="mountain">mountain</option>
                    <option value="highway">highway</option>
                    <option value="women's">women's</option>
                    <option value="scooter">scooter</option>
                </select>
                <input type="color" name='color' placeholder='Color' style={{padding: 0}} title='change color'
                       value={state.bike.color.value}/>
                <input type="text" name='wheel' placeholder='Wheel size' value={state.bike.wheel.value}/>
                <input type="number" name='price' placeholder='Price' value={state.bike.price.value}/>
                <input type="text" name='id' placeholder='ID: XXXXXX' title='input only integers number'
                       onFocus={onHandlePurposeId} ref={idRef} value={state.bike.id.value}/>
                <textarea cols="30" rows="4" name='description' placeholder='Description'
                          value={state.bike.description.value}></textarea>
                <div className='error-message'>
                    <ul>
                        {
                            Object.values(state.bike)
                                .filter(item => {return item.message !== '' ? item.message : ''})
                                .map(item => ( <li>{item.message}</li>))
                        }
                    </ul>
                </div>
                <button type='submit' className='container jcc aic' disabled={state.submit}
                        style={state.submit === 'disabled' ? {backgroundColor: '#d2cfcf'} : {backgroundColor: '#696969'}}>SAVE
                </button>
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