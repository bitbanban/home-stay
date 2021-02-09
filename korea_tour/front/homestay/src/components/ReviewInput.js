import React, {useState} from 'react';
import { post } from 'axios';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import InputLabel from '@material-ui/core/InputLabel';

import "./ReviewInput.css"

import StarRating from './AllStarRating';
import ReTextarea from './ReviewTextarea';
import ReviewFileUpload from './ReviewFileUpload';
const ReviewInput = () => {
    const [review,SetReview] = useState({
        clean:0,
        communicate:0,
        checkIn:0,
        accuracy:0,
        location:0,
        contentment:0,
        photo: '',
        content:'',
    })
   

        return (
            <div>
                <form>
                <div>
                <StarRating />
                <ReviewFileUpload/>
                </div>
               <ReTextarea/>
                <button type="submit">리뷰작성</button>
                </form>
            </div>
        );
    }
export default ReviewInput;

