import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import Register from './register';
import Login from './login';

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    showModal() {
        this.setState({
            showLogin: true
        });
    }

    closeModal() {
        this.setState({
            showLogin: false
        });
    }

    render() {
        return (
            <div className="welcome">
                <HashRouter>
                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => {
                                return (
                                    <div className="welcome">
                                        <h1>Super Roomie</h1>
                                        <h3>Find the ultimate flatmate!</h3>
                                        <div id="minions">
                                            <img src="/assets/Batminion1.png" />
                                            <img src="/assets/Ironminion1.png" />
                                            <img src="/assets/Superminion1.png" />
                                            <img src="/assets/Wolverminion1.png" />
                                        </div>

                                        <button onClick={this.showModal}>Login</button>
                                        {this.state.showLogin && <Login closeModal={this.closeModal} />}
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
