import React from "react";
import './App.css';
import BikeList from "./component/bikeList/bikeList";
import Editor from "./component/editor/editor";
import Footer from './component/footer/footer';
import Header from './component/header/header';

function App() {
    return (
        <div className='wrapper container col'>
            <Header />
            <div className='admin container row'>
                <BikeList/>
                <Editor/>
            </div>
            <Footer />
        </div>
    );
}

export default App;
