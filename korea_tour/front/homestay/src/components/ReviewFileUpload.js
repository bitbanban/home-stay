import React, {useState} from 'react';

import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import "./ReviewInput.css"


const ReviewFileUpload = () => {

    const uploadImage = e => {
        const uploadFile = e.target.files;
        const imageFile = new FormData();
        if (uploadFile.length >4 ) {
          alert('사진은 4장 이하만 가능합니다!');
          e.target.value = '';
        }
        imageFile.append('uploadFile', uploadFile);
        console.log(uploadFile);
      };

        return (
            <div>

                <input accept="image/*" 
                id="icon-button-file" 
                type="file" 
                onChange={uploadImage}
                style={{ display: 'none' }}
                multiple />
                <label htmlFor="icon-button-file">
                   <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                   >
                   <PhotoCamera />
                   </IconButton>
                </label>
            
            </div>
        );
    }
export default ReviewFileUpload;