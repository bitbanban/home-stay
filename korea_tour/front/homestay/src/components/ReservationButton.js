import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListIcon from '@material-ui/icons/List';
import EventBusyIcon from '@material-ui/icons/EventBusy';



const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
  

export default function ReservationButton() {

  const classes = useStyles();
  
  return (
    <div>
  
    <Button
      variant="contained"
      color="default"
      className={classes.button}
      startIcon={<ListIcon />}
    >
       <Link to="/homestay/mypage/ReservationList"> 
      목록으로
      </Link>
    </Button>
    <Button
     variant="contained"
     color="default"
     className={classes.button}
     startIcon={<EventBusyIcon />}
    >
      예약취소
      </Button>
  </div>
  );
}
