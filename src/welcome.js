import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import Register from './register';
import Login from './login';

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false
        };
    }
    render() {
        return (
            <div id="welcome">
                <HashRouter>
                    <div>
                        <Route exact path="/" render={() => {
                            return (
                                <div>
                                    {this.state.showLogin && <Login />}
                                    <h1>Super Roomie</h1>
                                    <img src="/assets/Batminion.png"/>
                                    <h3>Find the ultimate flatmate!</h3>

                                    <p onClick={this.showLogin}>Login</p>

                                    <Link to="/register">Register</Link>
                                </div>
                            );
                        }}
                        />
                        <Route exact path="/register" component={Register} />
                    </div>
                </HashRouter>
            </div>
        );
    }

}
