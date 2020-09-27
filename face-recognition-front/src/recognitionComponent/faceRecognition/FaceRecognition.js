import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ box, imgUrl }) => {
    return (
        <div className="face">
            <div className='reco'>
                <img id='inputimage' alt="" src={imgUrl}/>
                <div className="bounding-box"
                    style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}
                >
                </div>
            </div>
        </div>
    )
}

export default FaceRecognition;
