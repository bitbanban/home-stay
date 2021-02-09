import React from 'react';
import { withRouter } from 'react-router-dom';

const MyReviewRow  =(props)=> {

    let date1= new Date();
    let date2= new Date(props.checkIn);
    let photo= 'http://localhost:9003/homeStayImg/'+ props.housePhoto;
    console.log(date1>date2);
        return (
            <div className="myReview-Row"> 
              <div className="myReview-title">
                  {props.title}
              </div>
              <div className="myReview-photo">
                  <img src={photo}/>
              </div>
              {props.review===0 && date1 > date2
                     ? 
                     <button onClick={() => {
                        props.history.push(
                          `/homestay/mypage/reviewwrite:${props.homeStayNum}`
                        );
                      }}>리뷰작성</button>
                     : (props.review===1
                     ?  <button className="no-review" disabled>작성 불가</button>
                     : <button className="no-review" disabled>작성 불가</button>
                     )
                    } 
            </div>
            
        );
    
}
export default withRouter(MyReviewRow);