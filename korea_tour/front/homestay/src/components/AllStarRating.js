import React, { useState } from 'react';

import Star from './StarRating';

const StarRating = props => {
  //   const [value, setValue] = props.star;
  const [name, setName] = useState({
    clean: 'cleanliness',
    communicate: 'communication',
    checkIn: 'checkIn',
    accuracy: 'accuracy',
    location: 'location',
    contentment: 'satisfactionForPrice',
  });


  return (
    <div>
      <span className="star clean">
        청결도 <Star name={name.clean} value={props.star} />
      </span>
      <span className="star communicate">
        의사소통 <Star name={name.communicate} value={props.star} />
      </span>
      <br />
      <span className="star checkIn">
        체크인 <Star name={name.checkIn} value={props.star} />
      </span>
      <span className="star accuracy">
        정확성 <Star name={name.accuracy} value={props.star} />
      </span>
      <br />
      <span className="star location">
        위치 <Star name={name.location} value={props.star} />
      </span>
      <span className="star contentment">
        가격대비 만족도 <Star name={name.contentment} value={props.star} />
      </span>

      {/* <span className="star communicate">의사소통 <Star1 name="communicate" value={this.communicate} onChange={onChange}/></span>
        <br/>
        <span className="star checkIn">체크인 <Star1 name="checkIn" value={this.checkIn} onChange={onChange}/></span>
        <span className="star accuracy">정확성 <Star1 name="accuracy" value={this.accuracy} onChange={onChange}/></span>
        <br/>
        <span className="star location">위치 <Star1 name="location" value={this.location} onChange={onChange}/></span>
        <span className="star contentment">가격대비 만족도 <Star1 name="contentment" value={this.contentment} onChange={onChange}/></span> */}
    </div>
  );
};

export default StarRating;