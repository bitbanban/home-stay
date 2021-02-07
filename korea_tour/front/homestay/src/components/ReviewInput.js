import React, {useState} from 'react';
import { post } from 'axios';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import InputLabel from '@material-ui/core/InputLabel';

import "./ReviewInput.css"

import StarRating from './AllStarRating';
import ReTextarea from './ReviewTextarea';

const ReviewInput = ({addReview}) => {

        return (
            <div>
               <form>
                

                <div>
                <StarRating />
                <input accept="image/*" id="icon-button-file" type="file" multiple />
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

               <ReTextarea/>
                <button type="submit">리뷰작성</button>
                </form> 
            </div>
        );
    }
export default ReviewInput;

