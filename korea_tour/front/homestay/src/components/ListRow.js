import React from 'react'; 
import axios from 'axios';
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { pink } from '@material-ui/core/colors';

import { withRouter } from 'react-router-dom';

const ListRow  =(props)=> {

  const DeleteMark = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:9003/homestays/mark?homeStayNum=${props.homeStayNum}`
      );
      alert("즐겨찾기가 삭제되었습니다");

       
    } catch (e) {
      console.log(e);
      
    }
  };
  
  let image= 'http://localhost:9003/homeStayImg/'+props.photo;
    return (
      <div>
        <div className="likeList" onClick={() => {
            props.history.push(
              `/homestay/housedetail:${props.homeStayNum}`
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