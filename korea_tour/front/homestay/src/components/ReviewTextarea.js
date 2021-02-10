import React, {useState} from 'react';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';


const ReviewTextarea =(props)=> {
        let text = props.content;
        const changeText = e => {
       
        text = e.target.value
        };

        return (
            <div>
                 <TextareaAutosize className="textarea" aria-label="minimum height" rowsMin={6} placeholder="리뷰를 작성해주세요"
                 name="content" value={text} onChange={changeText}
                 />
            </div>
        );
}

export default ReviewTextarea;