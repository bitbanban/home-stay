import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(6),
      }
    }));




    export default function AdminApproval() {
        const classes = useStyles();
      
        return (
    <div className={classes.button}>
        <Button variant="contained" size="small" id="approval">승인</Button>&nbsp;&nbsp;
        <Button variant="contained" color="secondary" size="denial" id="orderByStars">반려</Button>
        </div>
        );
    }