import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

export default function HoverRating(props) {
  const [value, setValue] = props.value;
  const [hover, setHover] = useState(-1);
  const classes = useStyles();

  const changeText = e => {
    let star = e.target.value;
    let starValue = star.replace(',', '');
    starValue = Number(starValue);
    setValue({ ...value, [e.target.name]: starValue });
    console.log('star=', starValue);
  };

  return (
    <div className={classes.root}>
      <Rating
        name={props.name}
        value={props.value}
        precision={0.5}
        onChange={changeText}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
    </div>
  );
}