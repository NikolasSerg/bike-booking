import React, {useState} from "react";
import './editor.css';
import {useDispatch, useSelector} from "react-redux";
import {addBikeAction} from "../../store/bikeReducer";
import localforage from "localforage";
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
                message: ''
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
                message: ''
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
        disabled: true,
    }

    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();

    const total = useSelector(state => state.bike.bike);
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
    const colorRef = React.createRef();
    const typeRef = React.createRef();

    let newState = {...state}
    let switchHandle = (e, subject, condition, message) => {
        if (eval(`${condition}`)) {
            subject.valid = true;
            subject.class = 'success';
            subject.message = '';
        } else {
            subject.valid = false;
            subject.message = message;
            subject.class = 'error';
        }
        if (e.target.name === 'price') {
            subject.value = parseInt(e.target.value);
        } else {
            subject.value = e.target.value;
        }
        setState(newState)
    }

    const onHandleChangeInput = (event) => {
        if (newState.bike.color.value === "") {
            newState.bike.color.value = colorRef.current.value;
            newState.bike.color.valid = true;
        }
        if (newState.bike.type.value === "") {
            newState.bike.type.value = typeRef.current.value;
            newState.bike.type.valid = true;
        }

        switch (event.target.name) {
            case 'name':
                let name = event.target.value;
                let check = total.find(item => item.name === name)
                if (!check && name.length >= 5) {
                    newState.bike.name.valid = true;
                    newState.bike.name.class = 'success';
                    newState.bike.name.message = '';
                } else if (check) {
                    newState.bike.name.valid = true;
                    newState.bike.name.message = 'WARNING: this name is exist';
                    newState.bike.name.class = 'warning';
                } else if (!check && name.length < 5) {
                    newState.bike.name.valid = false;
                    newState.bike.name.message = 'ERROR: Name has to be minimum 5 characters';
                    newState.bike.name.class = 'error';
                }
                newState.bike.name.value = name;
                setState(newState)
                break
            case 'type':
                switchHandle(event, newState.bike.type, 'event.target.value !== ""', 'ERROR: the Type field has to be change');
                break
            case 'color':
                switchHandle(event, newState.bike.color, 'event.target.value !== ""', 'ERROR: the Color field has to be change');
                break
            case 'wheel':
                switchHandle(event, newState.bike.wheel, 'e.target.value !== ""', 'ERROR: the Wheel field is empty');
                break
            case 'price':
                switchHandle(event, newState.bike.price, 'event.target.value !== \'\' && event.target.value.length >=1', 'ERROR: the Prise field has to be minimum 1 number');
                break
            case 'id':
                switchHandle(event, newState.bike.id, 'event.target.value.length >= 5', 'ERROR: the ID field has to be minimum 5 characters');
                break
            case 'description':
                switchHandle(event, newState.bike.description, 'event.target.value.length >= 15', 'ERROR: the Description filed has to be minimum 15 characters');
                break
        }

        if (Object.keys(state.bike).every(item => state.bike[item].valid === true)) {
            setState(state => ({...state, disabled: false}));
        } else {
            setState(state => ({...state, disabled: true}));
        }
    }
    const onHandlePurposeId = () => {
        if (state.bike.id.value === '') {
            let id = new Date().getTime();
            idRef.current.value = id;
            newState.bike.id.value = id;
            newState.bike.id.valid = true;
            newState.bike.id.class = 'success';
            newState.bike.id.message = '';
            setState(newState);
        }
    }

    const onHandleSubmit = (event) => {
        event.preventDefault();
        console.log('SUBMIT')
        console.log(state.bike);
        let newBike = {
            id: state.bike.id.value,
            name: state.bike.name.value,
            type: state.bike.type.value,
            color: state.bike.color.value,
            wheelSize: state.bike.wheel.value,
            img: "",
            status: "available",
            price: state.bike.price.value
        }

        dispatch(addBikeAction(newBike));

        handleClear();
    }
    const handleClear = () => {
        setState(initialState)
    }
    const onHandleClear = (event) => {
        handleClear()
    }

    return (
        <div className='container col editor' style={{backgroundColor: '#fff'}}>
            <form className='inputBlock container row fw'
                  onChange={(event) => onHandleChangeInput(event)} onSubmit={onHandleSubmit}>
                <input type="text" name='name' placeholder='Name' className={state.bike.name.class}
                       value={state.bike.name.value}/>
                {/*<input type="text" name='type' placeholder='Type'value={state.bike.type}/>*/}
                <select name='type' value={state.bike.type.value} className={state.bike.type.class} ref={typeRef}>
                    <option value="kids">kids</option>
                    <option value="mountain">mountain</option>
                    <option value="highway">highway</option>
                    <option value="women's">women's</option>
                    <option value="scooter">scooter</option>
                </select>
                <input type="color" name='color' placeholder='Color' style={{padding: 0}}
                       className={state.bike.color.class} title='change color'
                       value={state.bike.color.value} ref={colorRef}/>
                <input type="text" name='wheel' placeholder='Wheel size' value={state.bike.wheel.value}
                       className={state.bike.wheel.class}/>
                <input type="number" onFocus={(event) => {
                    console.log(event.target.value)
                }} name='price' placeholder='Price' value={state.bike.price.value} className={state.bike.price.class}/>
                <input type="text" name='id' placeholder='ID: XXXXXX' title='input only integers number'
                       onFocus={onHandlePurposeId} ref={idRef} value={state.bike.id.value}
                       className={state.bike.id.class}/>
                <textarea cols="30" rows="4" name='description' placeholder='Description'
                          value={state.bike.description.value} className={state.bike.description.class}></textarea>
                <div className='error-message'>
                    <ul>
                        {
                            Object.values(state.bike)
                                .filter(item => {
                                    return item.message !== '' ? item.message : ''
                                })
                                .map(item => (<li className={`${item.class}-font`}>{item.message}</li>))
                        }
                    </ul>
                </div>
                <button type='submit' className='container jcc aic'
                        disabled={state.disabled}
                        style={state.disabled === true ? {backgroundColor: '#c5c2c2'} : null}>
                    ADD
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