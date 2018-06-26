import React, { Component } from 'react';
import axios from './axios';
import { BrowserRouter, Route } from 'react-router-dom';
import Profile from './profile';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get('/user').then(({data}) => {
            this.setState({
                first: data.first,
                last: data.last,
                profilePic: data.image_url || "/assets/default.png",
                id: data.id,
            });
        });
    }

    // showUploader() {
    //     this.setState({
    //         uploaderIsVisible: true
    //     });
    // }
    //
    // closeUploader() {
    //     this.setState({
    //         uploaderIsVisible: false
    //     });
    // }
    //
    // setImage(imgUrl) {
    //     this.setState({
    //         profilePic: imgUrl,
    //         uploaderIsVisible: false
    //     });
    // }
    //
    // setBio(newBio) {
    //     this.setState({
    //         bio: newBio
    //     });
    // }

    render() {
        // if (!this.state.id) {
        //     return null;
        // }
        return (
            <div className="app">
                <header><img src="/assets/Logo.png" /></header>
                <BrowserRouter>
                    <div>
                        <Route path="/profile" component={Profile} />
                    </div>
                </BrowserRouter>
                <footer>Footer</footer>
            </div>
        );
    }
}

export default App;
