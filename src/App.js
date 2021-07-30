import React, {useEffect, useState} from "react";
import './App.css';
import BikeList from "./component/bikeList/bikeList";
import Editor from "./component/editor/editor";

function useWindowSize() {
    // const [size, setSize] = useState(window.innerWidth);
    // useEffect(() => {
    //     const handleResize = () => {
    //         setSize(window.innerWidth)
    //     };
    //     window.addEventListener('resize', handleResize)
    // }, [])
    // return size
}

function App() {
    // const [size, setSize] = useState(window.innerWidth);
    // const handleResize = () => {
    //     setSize(window.innerWidth)
    // };
    // useEffect(() => {
    //     window.addEventListener('resize', handleResize)
    // }, []);
    // if(size < 600) {
    //     console.log('LESS')
    // } else {
    //     console.log('MORE')
    // }
    return (
        <div className='wrapper container col'>
            <header className='header'>ADMIN.BIKE-BOOKING.COM</header>
            <div className='admin container row'>
                <BikeList/>
                <Editor/>
            </div>
            <footer className='footer'>
                Developer: <span>Sergiu Nikolaichuk</span>
            </footer>
        </div>
    );
}

export default App;
