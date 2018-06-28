import React from "react";
// import { Link } from "react-router-dom";
import axios from './axios';
import { Logo, Logout, MatchesNav, ChatNav } from './header';


export default class Matches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get('/matches').then((data) => {
            console.log(data);
            // this.setState({
            //
            // });
        });
    }
    render() {
        return (
            <div>
                <header>
                    <Logo />
                    <MatchesNav />
                    <ChatNav />
                    <Logout />
                </header>
                <div className="body">
                    <h1>Matches</h1>
                </div>
                <footer>Footer</footer>
            </div>
        );
    }
}
