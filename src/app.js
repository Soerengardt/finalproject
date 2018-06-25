import React, { Component } from 'react';
// import axios from './axios';
import { BrowserRouter, Route } from 'react-router-dom';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        return;
    }

    render() {
        return (
            <div id="app">
                <h1>This is my App component</h1>
            </div>
        );
    }
}

export default App;
