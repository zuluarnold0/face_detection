import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className="imageLinkForm">
           <p>{'Paste image link to detect a face.'}</p>
           <div className='linkForm'>
                <input 
                    type='text' 
                    placeholder="paste your image link here..." 
                    onChange={onInputChange}
                    name="input"
                />
                <button
                    onClick={onButtonSubmit}
                >
                    Detect
                </button>   
            </div> 
        </div>
    )
}

export default ImageLinkForm;
