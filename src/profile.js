import React, { Component } from 'react';
import axios from './axios';
import { Logo, ProfilePic } from './header';
import Uploader from './uploader';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showUploader = this.showUploader.bind(this);
        this.closeUploader = this.closeUploader.bind(this);
        this.setImage = this.setImage.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    showUploader() {
        this.setState({
            uploaderIsVisible: true
        });
    }

    closeUploader() {
        this.setState({
            uploaderIsVisible: false
        });
    }

    setImage(imgUrl) {
        this.setState({
            profilePic: imgUrl,
            uploaderIsVisible: false
        });
    }
    handleInput(e) {
        this[e.target.name] = e.target.value;
        console.log(e.target.name);
    }
    // updateTextInput(val) {
    //     document.getElementById('textInput').value=val;
    // }
    handleSubmit() {
        const { user_id, bday, gender, city, date, rent } = this;
        axios
            .post("/profile", {
                user_id,
                bday,
                gender,
                city,
                date,
                rent
            })
            .then(resp => {
                if (resp.data.success) {
                    location.replace("/questionnaire");
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
        return (
            <div className="profile">
                <header>
                    <Logo />
                </header>
                <div className="body">
                    <h3>
                        Ok Fella, now please give us some basic information
                        about you!
                    </h3>
                    <ProfilePic
                        imageUrl={this.state.profilePic}
                        toggleToUploader={this.showUploader}
                        id={this.state.id}
                        first={this.state.first}
                        last={this.state.last}
                        profilePic={this.state.image_url}
                        showUploader={this.showUploader}
                    />
                    {this.state.uploaderIsVisible && (
                        <Uploader setImage={this.setImage} closeModal={this.closeUploader} />
                    )}
                    Date of birth<input
                        type="date"
                        name="bday"
                        onChange={this.handleInput}
                    />
                    <h3>Gender</h3>
                    Superman<input
                        type="radio"
                        name="gender"
                        value="male"
                        onChange={this.handleInput}
                    />
                    Supergirl<input
                        type="radio"
                        name="gender"
                        value="female"
                        onChange={this.handleInput}
                    />
                    Where do you look for your Match?<input
                        placeholder="City"
                        type="text"
                        name="city"
                        onChange={this.handleInput}
                    />
                    When would you like to share a flat?<input
                        type="date"
                        name="date"
                        onChange={this.handleInput}
                    />
                    Maximum Costs for the room:<input
                        type="range"
                        name="rent"
                        min="400"
                        max="800"
                        step="10"
                        onChange={this.handleInput}
                    />
                    <button onClick={() => this.handleSubmit()}>Submit</button>
                </div>
                <footer>Footer</footer>
            </div>
        );
    }
}
