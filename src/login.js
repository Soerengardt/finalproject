import React, { Component } from 'react';
import axios from './axios';
import { Link } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
            // ,
            // () => {
            //     console.log(this.state);
            // }
        );
    }

    onSubmit(e) {
        e.preventDefault();

        axios.post("/login", this.state).then(resp => {
            if (resp.data.success) {
                location.replace("/home");
            } else {
                this.setState({
                    error: true
                });
            }
        });
    }

    render() {
        return (
            <div className="modal-wrapper">
                <div id="login-modal">
                    <p>Yo, good to have you back!</p>
                    <form onSubmit={this.onSubmit}>
                        <input type="text" name="email" onChange={this.onChange} />
                        <input type="password" name="password" onChange={this.onChange} />
                        <button>Login!</button>
                        <button onClick={this.props.closeModal}>Back</button>
                    </form>

                </div>
            </div>
        );
    }
}


export default Login;
