import React, {useState} from 'react';

import Star from './StarRating';

const StarRating = (props) => {
        
    const [value,setValue] = useState({
        clean:0,
        communicate:0,
        checkIn:0,
        accuracy:0,
        location:0,
        contentment:0

    })
    const [name,setName]=useState({
        clean:"clean",
        communicate:"communicate",
        checkIn:"checkIn",
        accuracy:"accuracy",
        location:"location",
        contentment:"contentment"
    })
    

 

    return (
        <div>
        <span className="star clean">청결도 <Star name={name.clean} value={value.clean}/></span>
        <span className="star communicate">의사소통 <Star name={name.communicate} value={value.communicate}/></span>
        <br/>
        <span className="star checkIn">체크인 <Star name={name.checkIn} value={value.checkIn}/></span>
        <span className="star accuracy">정확성 <Star name={name.accuracy} value={value.accuracy}/></span>
        <br/>
        <span className="star location">위치 <Star name={name.location} value={value.location}/></span>
        <span className="star contentment">가격대비 만족도 <Star name={name.contentment} value={value.contentment}/></span>

        {/* <span className="star communicate">의사소통 <Star1 name="communicate" value={this.communicate} onChange={onChange}/></span>
        <br/>
        <span className="star checkIn">체크인 <Star1 name="checkIn" value={this.checkIn} onChange={onChange}/></span>
        <span className="star accuracy">정확성 <Star1 name="accuracy" value={this.accuracy} onChange={onChange}/></span>
        <br/>
        <span className="star location">위치 <Star1 name="location" value={this.location} onChange={onChange}/></span>
        <span className="star contentment">가격대비 만족도 <Star1 name="contentment" value={this.contentment} onChange={onChange}/></span> */}
        </div>
    )
};

export default StarRating;
