import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

export default ({data}) => {
    const { price, face, size, date } = data;
    const classes = useStyles();

    return (
        <Grid item xs={6}>
            <Paper className={classes.paper}>
                <div style={{display:'block'}}><span style={{fontSize: size}}>{face}</span></div>
                <div style={{display:'block'}}>{`$${parseFloat(price).toFixed(2)}`}</div>
                <div style={{display:'block'}}>{date}</div>
            </Paper>
        </Grid>
    );
}