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
        this.showModal = this.showModal.bind(this);
    }
    showModal() {
        this.setState({
            showLogin: true
        });
    }
    render() {
        return (
            <div>
                <HashRouter>
                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => {
                                return (
                                    <div>
                                        <h1>Super Roomie</h1>
                                        <img src="/assets/Batminion1.png" />
                                        <img src="/assets/Ironminion1.png" />
                                        <img src="/assets/Superminion1.png" />
                                        <img src="/assets/Wolverminion1.png" />
                                        <h3>Find the ultimate flatmate!</h3>

                                        <button onClick={this.showModal}>Login</button>
                                        {this.state.showLogin && <Login />}

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
