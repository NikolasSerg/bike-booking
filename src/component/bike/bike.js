import React from "react";
import './bike.css';
import {changeStatusAction, removeBikeAction} from '../../store/bikeReducer';
import {connect} from "react-redux";

class Bike extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleChangeColor = () => {
        if (this.props.bike.status === 'available') {
            this.setState({borderColor: '#6FCF97'})
            console.log('changed to green');
        }
        if (this.props.bike.status === 'unavailable') {
            this.setState({borderColor: '#EB5757'})
            console.log('changed to green');
        }
        if (this.props.bike.status === 'busy') {
            this.setState({borderColor: '#F2994A'})
            console.log('changed to yellow');
        }
        console.log(this.state.borderColor, ' -this.state.borderColor')
    }
    onHandleChange = (event) => {
        this.props.changeStatus(event)
        this.handleChangeColor()
    }
    onHandleRemove = (id) => {
        console.log(id, ' - id target remove');
        this.props.remoteBike(id);
    }
    componentDidMount() {
        this.handleChangeColor()
    }

    render() {
        return (
            <li className='container col jcsb bikeItem' style={{borderColor: this.state.borderColor}}>
                <div className='container'>
                    <div className="container row fw jcsb name">
                        <div style={{fontWeight: 600}}><span style={{marginRight: '1rem'}}>NAME: </span>{this.props.bike.name}</div>
                        <div><span style={{marginRight: '1rem'}}>TYPE: </span>{this.props.bike.type}</div>
                    </div>
                    <span className='close' onClick={() => this.onHandleRemove(this.props.bike.id)}>&#215;</span>
                </div>
                <div className="container row aic">
                    <span style={{marginRight: '1rem'}}>COLOR: </span>
                    <div className='colorPiker'
                         style={{backgroundColor: this.props.bike.color}}></div>
                </div>
                <div style={{fontSize: '10px'}}>
                    <span style={{marginRight: '1rem'}}>ID: </span><span>{this.props.bike.id}</span>
                </div>
                <div className='container row jcsb'>
                    <div className='container row jcsb aic' style={{width: '170px'}}>
                        <span> STATUS: </span>
                        <select value={this.props.bike.status} className='select' id={this.props.bike.id}
                                onChange={this.onHandleChange}>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                            <option value="busy">Busy</option>
                        </select>
                    </div>
                    <div style={{fontSize: '24px'}}>
                        <span style={{fontWeight: '600'}}>{this.props.bike.price}</span><span>UAH/hr</span>
                    </div>
                </div>
            </li>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    changeStatus: (event) => dispatch(changeStatusAction({id: event.target.id, select: event.target.value})),
    remoteBike: (id) => dispatch(removeBikeAction({id})),
})

export default connect(null, mapDispatchToProps)(Bike);







