import React from 'react';
import axios from './axios';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInput(e) {
        this[e.target.name] = e.target.value;
    }
    handleSubmit() {
        // console.log(this);
        const { first, last, email, password, role } = this;
        axios
            .post("/register", {
                first,
                last,
                email,
                password,
                role
            })
            .then(resp => {
                if (resp.data.success) {
                    location.replace("/profile");
                } else {
                    this.setState(
                        {
                            error: true
                        },
                        () => {
                            console.log(this.state);
                        }
                    );
                }
            });
    }
    render() {
        return (
            <div id="register">
                <h3>Hi Fella, please tell us your name and register to continue!</h3>
                {this.state.error && <div className="err">Oops! You suck!</div>}
                <input placeholder="First" type="text" name="first" onChange={this.handleInput} />
                <input placeholder="last" type="text" name="last" onChange={this.handleInput} />
                <input placeholder="email" type="email" name="email" onChange={this.handleInput} />
                <input placeholder="password" type="password" name="password" onChange={this.handleInput}/>

                <h3>I am looking for a</h3>
                <input type="radio" name="role" value="landlord" onChange={this.handleInput} />flatmate
                <input type="radio" name="role" value="tenant" onChange={this.handleInput} />flat
                <button onClick={() => this.handleSubmit()}>Submit</button>
            </div>
        );
    }
}
