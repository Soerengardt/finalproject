import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import axios from './axios';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleInput(e) {
        this[e.target.name] = e.target.value;
    }
    // updateTextInput(val) {
    //     document.getElementById('textInput').value=val;
    // }
    render() {
        return (
            <div className="questionaire" id="profile">
                <h3>Ok Fella, now please give us some basic information about you!</h3>
                Date of birth<input type="date" name="bday" />
                <h3>Gender</h3>
                Superman<input type="radio" name="gender" value="male" onChange={this.handleInput} />
                Supergirl<input type="radio" name="gender" value="female" onChange={this.handleInput} />

                Where do you look for your Match?<input placeholder="City" type="text" name="city" onChange={this.handleInput} />
                When would you like to share a flat?<input type="date" name="date" onChange={this.handleInput} />
                Maximum Costs for the room:<input type="range" name="rent" min="400" max="800" step="10" onChange={this.handleInput} />
                <button onClick={() => this.handleSubmit()}>Submit</button>
            </div>
        );
    }
}
