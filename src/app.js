import React, { Component } from 'react';
import axios from './axios';
import { BrowserRouter, Route } from 'react-router-dom';
import Profile from './profile';
import { Logo, Logout } from './header';
import Questionnaire from './questionnaire';
import Home from './home';
import Matches from './matches';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        return;
        // axios.get('/user').then(({data}) => {
        //     this.setState({
        //         first: data.first,
        //         last: data.last,
        //         profilePic: data.image_url || "/assets/default.png",
        //         id: data.id,
        //     });
        // });
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
            <div>
                <BrowserRouter>
                    <div>
                        <Route path="/profile" component={Profile} />
                        <Route path="/questionnaire" component={Questionnaire} />
                        <Route path="/home" component={Home} />
                        <Route path="/matches" component={Matches} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
