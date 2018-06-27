import React from "react";
import { Link } from "react-router-dom";
import axios from './axios';
import { Logo, Logout, MatchesNav, ChatNav } from './header';


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // componentDidMount() {
    //     axios.get('/questions').then(({data}) => {
    //         this.setState({
    //             first: data.first,
    //             last: data.last,
    //             profilePic: data.image_url || "/assets/default.png",
    //             id: data.id,
    //             bio: data.bio
    //         });
    //     });
    // }
    render() {
        return (
            <div className="home">
                <header>
                    <Logo />
                    <MatchesNav />
                    <ChatNav />
                    <Logout />
                </header>
                <div className="body">
                    <h2>Home</h2>
                </div>
                <footer>Footer</footer>
            </div>
        );
    }
}
