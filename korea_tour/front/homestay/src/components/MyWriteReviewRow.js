import React, { useEffect, useState } from 'react';
import axios from 'axios';


const MyWriteReviewRow = (props) => {
     
    let photo = props.photoName;
    console.log(photo);
    /*let photoUrl =`http://localhost:9003/homeStayReviewImg/`+props.reviewPhotos.photoName
    
    {photo.map((photo)=>
                (<img src={"http://localhost:9003/homeStayReviewImg/"+photo.photoName}></img>) 
                 )}*/
    const photoList = photo.map(
        (photo,i) => (
            <img key={i} src={"http://localhost:9003/homeStayReviewImg/"+photo.photoName}/>
        )
    );
    return (
          <div>
          <div className="hostInfo">
          <h3>{props.hostName}</h3>
          <img src={"http://localhost:9003/homeStayImg/"+props.hostPhoto} />        
          </div>
          <div>
            {photoList}    
          </div>  

           <p>청결도 :</p>{props.cleanliness.toFixed(1)}
           <p>의사소통 :</p>{props.communication.toFixed(1)}
           <p>체크인 :</p>{props.checkIn.toFixed(1)}
           <p>정확성 :</p>{props.accuracy.toFixed(1)}
           <p>위치 :</p>{props.location.toFixed(1)}
           <p>가격대비 만족도: </p>{props.Price.toFixed(1)}
           <div>
               {props.content}
           </div>
           <p>{props.writeday}</p>
          </div>

      );
}

export default  MyWriteReviewRow;