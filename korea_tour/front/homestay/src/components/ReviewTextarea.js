import React, {useState} from 'react';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';


class ReviewTextarea extends React.Component {
    render() {
        return (
            <div>
                 <TextareaAutosize className="textarea" aria-label="minimum height" rowsMin={6} placeholder="리뷰를 작성해주세요"/>
            </div>
        );
    }
}

export default ReviewTextarea;