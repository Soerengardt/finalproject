import React from "react";
// import { Link } from "react-router-dom";
import axios from './axios';
import { Logo, Logout, MatchesNav, ChatNav, HomeNav } from './header';


export default class Matches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    renderMatches(matches) {
        return matches.map((match) => {
            return (
                <div id="matches-container">
                    <img src={match.image_url || "/assets/default.png"}/>
                        <h4>{match.first} , {match.last}</h4>
                </div>
            );
        });
    }
    componentDidMount() {
        axios.get('/getmatches').then(({ data }) => {
            console.log(data);
            this.setState({
                firstQuestionMatches: data.firstQuestionMatches,
                secondQuestionMatches: data.secondQuestionMatches,
                thirdQuestionMatches: data.thirdQuestionMatches
            });
        });
    }
    render() {
        if (!this.state.firstQuestionMatches || !this.state.firstQuestionMatches.length) {
            return (
                <div>Loading...</div>
            );
        }
        return (
            <div>
                <header>
                    <Logo />
                    <HomeNav />
                    <ChatNav />
                    <Logout />
                </header>
                <div>
                    <h3>Here are your best matches for qu#1</h3>
                    {this.renderMatches(this.state.firstQuestionMatches)}
                    <h3>Here are your best matches for qu#2</h3>
                    {this.renderMatches(this.state.secondQuestionMatches)}
                    <h3>Here are your best matches for qu#3</h3>
                    {this.renderMatches(this.state.thirdQuestionMatches)}
                </div>
            </div>
        );
    }
}
