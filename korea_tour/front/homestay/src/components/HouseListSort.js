import React from "react";
import { URL } from '_utils/api';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  mainFeatured: {
    height: 180,
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/oGl9C2wW3T0/6016x4016)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  mainFeaturedContent: {
    position: "relative",
    padding: theme.spacing(5),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  button: {
    marginRight: theme.spacing(6),
  }
}));

export default function HouseListSort(props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.mainFeatured}>
      <Grid item md={6} className={classes.mainFeaturedContent}>
        <Typography component="h1" variant="h5" color="inherit" gutterBottom>
          근처 숙소들 :)
          <br/>
        </Typography>
        <div className={classes.button}>
        </div>
      </Grid>
    </Grid>
  );
}