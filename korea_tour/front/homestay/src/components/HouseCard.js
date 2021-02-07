import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Box from '@material-ui/core/Box';
import Star from './Star';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { pink } from '@material-ui/core/colors';
import { withRouter } from 'react-router-dom';
//import HouseListSort from './HouseListSort';

const useStyles = makeStyles(() => ({
  root: { maxwidth: 365 },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
}));

function HouseCard(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);
  const [state, setState] = useState(true);

  const UpdateMark = async () => {
    try {
     const url=`http://localhost:9003/homestays/mark?homeStayNum=${props.homeStayNum}`
      console.log(url);
      const response = await axios.post(
        url
      ).then(res=>{console.log(res)});

      
    } catch (e) {
      console.log(e);
    }
  };

  const DeleteMark = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:9003/homestays/mark?homeStayNum=${props.homeStayNum}`
      );
      console.log("삭제성공");
       
    } catch (e) {
      console.log(e);
      
    }
  };


  return (
    
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="add to favorites">
           <div onClick={function toggle() {
            setState(!state);
            }}>
             {state ? <span onClick={UpdateMark}><FavoriteBorderIcon /></span> : <span onClick={DeleteMark}><FavoriteIcon style={{ color: pink[500] }} /></span>}
            </div> 
          </IconButton>
        }
        title={props.title}
      />
      <CardMedia
        className={classes.media}
        image={"http://localhost:9003/homeStayImg/"+props.photoName}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         {props.addr1}
        </Typography>
        <Star /> {props.avgOfStar}
         <Box component="fieldset" mb={3} borderColor="transparent">
         <Typography id="rate" variant="legend" color="textSecondary" component="p">
        {props.price}</Typography>
         <Typography component="legend" id="reviewCnt" color="textSecondary">({props.countOfReview})</Typography>
         <Typography component="legend" id="price" color="textSecondary"></Typography>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
      <Button color="secondary" onClick={() => {
        props.history.push(
        `/homestay/housedetail/${props.homeStayNum}` )
      }}>자세히보기>></Button>
      </CardActions>
      {/*<HouseListSort /> */}
    </Card>
  );
}

export default withRouter(HouseCard);