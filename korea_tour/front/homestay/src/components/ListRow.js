import  React, { useState } from 'react';

import store from '_store/Store';
import axios from 'axios';
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { pink } from '@material-ui/core/colors';

import { withRouter } from 'react-router-dom';

const ListRow  =(props)=> {

  const userNum = store.getState().userReducer.num;
  console.log(userNum)

  const DeleteMark = async () => {
    
    try {
      const response = await axios.delete(
        `http://localhost:9003/homestays/mark?homeStayNum=${props.homeNum}&userNum=${userNum}`,
        { data: { homeStayNum: props.homeNum, userNum: userNum} });
      console.log("삭제성공");
       
    } catch (e) {
      console.log(e);
      
    }
  };

  let image= 'http://localhost:9003/homeStayImg/'+props.photo;
    return (
      <div>
        <div className="likeList" onClick={() => {
            props.history.push(
              `/homestay/housedetail?houseNum=${props.homeNum}`
            );
          }}>
        <img className="likeImg" src={image}/>
        <p className="likeHome">{props.title}</p>
        <p className="likeHost">{props.hostName}</p>
        <p className="likeAddr">{props.addr}</p>
        <p className="likeStar">{props.star}</p>
        </div>
          <div>
          <IconButton aria-label="add to favorites">
          <span onClick={DeleteMark}><FavoriteIcon style={{ color: pink[500] }} /></span>
          </IconButton>
          </div>
      </div>
    );
}
export default withRouter(ListRow);