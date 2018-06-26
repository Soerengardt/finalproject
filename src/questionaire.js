import React from "react";
import { Link } from "react-router-dom";
import axios from './axios';


export default class Questionaire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get('/questions').then(({data}) => {
            this.setState({
                first: data.first,
                last: data.last,
                profilePic: data.image_url || "/assets/default.png",
                id: data.id,
                bio: data.bio
            });
        });
    }
    render() {
        if (!this.state.questions) {
            return null;
        }
        return (
            <div>{this.state.questions.map(q => <div>q.text</div>)}</div>
        );
    }
}
