import React from "react";
import './App.css';
import BikeList from "./component/bikeList/bikeList";
import Editor from "./component/editor/editor";


function App() {
    return (
        <div className='wrapper container col'>
            <header className='header'>ADMIN.BIKE-BOOKING.COM</header>
            <div className='editor container row'>
                <BikeList/>
            </div>
            <footer className='footer'>
                Developer: <span>Sergiu Nikolaichuk</span>
            </footer>
        </div>
    );
}

export default App;
