import React from "React";
import axios from "./axios";

class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setFile = this.setFile.bind(this);
        this.upload = this.upload.bind(this);
    }
    setFile(e) {
        this.file = e.target.files[0];
    }
    upload(e) {
        e.preventDefault();
        console.log(this.file);
        const formData = new FormData();
        formData.append("file", this.file);
        axios.post("/upload", formData).then(({ data }) => {
            this.props.setImage(data);
        });
    }
    render() {
        return (
            <div id="imageUploader">
                <div id="uploaderClose" onClick={this.props.closeModal}>X</div>
                <p>Upload new image here</p>
                <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={this.setFile}
                />
                <button onClick={this.upload}>Upload</button>
            </div>
        );
    }
}

export default Uploader;
