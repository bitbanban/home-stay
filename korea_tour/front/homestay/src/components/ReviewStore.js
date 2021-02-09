import React, { useState, useContext } from 'react';
import ReviewInput from './ReviewInput';
const ReviewContext = React.createContext();

const ReviewProvider = () => {
  const [star, setStar] = useState({
    addr1: '',
    addr2: '',
    email1: '',
    email2: '',
    hp: '',
  });
  const [reviewPicture, setReviewPicture] = useState({

  });
  const [reviewText, setReviewText] = useState({
    textarea: '',
  });

  return (
    <div>
      <ReviewContext.Provider
        value={{
          star, 
          setStar,
          reviewPicture,
          setReviewPicture,
          reviewText,
          setReviewText
        }}
      >
        <ReviewInput />
      </ReviewContext.Provider>
    </div>
  );
};
export { ReviewProvider, ReviewContext };