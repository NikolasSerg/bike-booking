import React from "react";
import './index.css';

export default function Bike() {
    return(
        <li>
            <div>
                <h3>Name</h3>
                <span>&#x2715</span>
            </div>
            <div>
                ID:
            </div>
            <div>
                <span> STATUS: </span>
                <select>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                    <option value="busy">Busy</option>
                </select>
            </div>
        </li>
    )
}