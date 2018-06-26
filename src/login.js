import React, { Component } from 'react';
import axios from './axios';
import { Link } from "react-router-dom";

class Login extends Component {
    constructor() {
        super();
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
            },
            () => {
                console.log(this.state);
            }
        );
    }

    onSubmit(e) {
        e.preventDefault();

        axios.post("/login", this.state).then(resp => {
            if (resp.data.success) {
                location.replace("/");
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
                    <form onSubmit={this.onSubmit}>
                        <input type="text" name="email" onChange={this.onChange} />
                        <input type="password" name="password" onChange={this.onChange} />
                        <button>Login!</button>
                    </form>
                    <h4>
                        <Link to="/">Back</Link>
                    </h4>
                </div>
            </div>
        );
    }
}


export default Login;
