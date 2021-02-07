import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > svg': {
    },
  },
}));

function StarIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </SvgIcon>
  );
}


export default function SvgIconsColor() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StarIcon style={{ color: yellow[500] }} />
    </div>
  );
}