import React, { Component } from 'react';
import Logo from './recognitionComponent/logo/Logo';
import Rank from './recognitionComponent/rank/Rank';
import ImageLinkForm from './recognitionComponent/imageLinkForm/ImageLinkForm';
import FaceRecognition from './recognitionComponent/faceRecognition/FaceRecognition';
import { port_ } from '../src/port/Port';

import Clarifai from 'clarifai';

import './App.css';
import './authComponent/auth.css';

const app = new Clarifai.App({
    apiKey: '5d3982a3e32a4d0cb1bc84c238d635fc'
});

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imgUrl: '',
            box: {}
        }
    }

    onInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - ((clarifaiFace.bottom_row * height) - (0.1 * height))
        }
    }

    displayFaceBox = (box) => {
        this.setState({ box: box });
    }

    onButtonSubmit = () => {
        this.setState({ imgUrl: this.state.input });
        app.models.predict(
                Clarifai.FACE_DETECT_MODEL,
                this.state.input
            )
            .then(response => {
                if (response) {
                    fetch(`${port_}/image`, {
                        method : 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.props.user.id
                        })
                    })
                    .then(response => response.json())
                    .then(count => {
                       this.setState(Object.assign(this.props.user, { entries: count }))
                    })
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err));
    }

    render() {
        const { user } = this.props;
        return (
            <div>
                <Logo />
                <Rank 
                    user={user}
                />
                <ImageLinkForm 
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition
                    box={this.state.box}
                    imgUrl={this.state.imgUrl}
                />
            </div>
        )
    }
}

export default App;
