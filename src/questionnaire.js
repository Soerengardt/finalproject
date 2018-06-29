import React from "react";
// import { Link } from "react-router-dom";
import axios from './axios';
import { Logo, Logout } from './header';


export default class Questionnaire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        axios.get("/questions").then(({ data }) => {
            // console.log(data);
            this.setState(
                {
                    questions: data.questions,
                    current: 0
                },
                () => console.log(this.state)
            );
        });
    }
    handleInput(e) {
        this[e.target.name] = e.target.value;
        console.log(e.target.name);
    }
    handleSubmit() {
        const { answ } = this;
        const questId = this.state.questions[this.state.current].id;

        axios
            .post("/questions", {
                answ,
                questId
            })
            .then(resp => {
                if (resp.data.success) {
                    if (this.state.current < this.state.questions.length-1) {
                        console.log(this.state.current, this.state.questions.length);
                        this.setState({
                            current: this.state.current + 1
                        });
                    } else {
                        location.replace("/matches");
                    }
                } else {
                    this.setState(
                        {
                            error: true
                        },
                        () => {
                            console.log(this.state);
                        }
                    );
                }
            });
    }
    render() {
        if (!this.state.questions) {
            return null;
        }
        return (
            // <h1>Question:</h1>
            <div className="questionnaire">
                <header>
                    <Logo />
                </header>
                <div className="body">
                    <h3>{this.state.questions[this.state.current].question}</h3>
                    <input
                        type="range"
                        name="answ"
                        min="1"
                        max="5"
                        step="1"
                        onChange={this.handleInput}
                    />
                    <button onClick={() => this.handleSubmit()}>Submit</button>
                </div>
            </div>
        );
    }
}
