import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IsVisible from '../isVisible';

const styles = th => ({
    paper_root: {
        padding: th.spacing(4),
        color: th.palette.text.secondary,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: 'center',
        height: '170px',
        transition: th.transitions.create("all", {
            easing: th.transitions.easing.sharp, 
            duration: th.transitions.duration.leavingScreen,
        })
    },
    paper_inactive: {
        backgroundColor: '#efefef'
    }
});

export class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: true
        }
    }
    
    onHide = () => {
        this.setState({display: false})
    }

    onShow = () => {
        this.setState({display: true})
    }
    
    getDate = (date) => {
        const today = Date.now();
        const formattedDate = new Date(date).getTime();
        const differenceInMilliseconds = today - formattedDate;
        const differenceInDays = Math.floor(differenceInMilliseconds/1000/3600/24);
    
        if (differenceInDays >= 7) return date;
    
        const dayConjuction = differenceInDays === 1 ? 'day' : 'days';
    
        return `${Math.floor(differenceInDays)} ${dayConjuction} ago.`;
    }

    render() {
        const { data, classes } = this.props;
        const { price, face, size, date } = data;
        const { display } = this.state
        const { getDate, onHide, onShow } = this;

        const productContent = (
            <React.Fragment>
                <Typography gutterBottom><span style={{fontSize: size}}>{face}</span></Typography>
                <Typography>{`Size: ${size}px`}</Typography>
                <Typography>{`Price: $${parseFloat(price).toFixed(2)}`}</Typography>
                <Typography>{`Added: ${getDate(date)}`}</Typography>
            </React.Fragment>
        )

        return (
            <IsVisible isDisplayed={display} onHide={onHide} onShow={onShow}>
                <Paper className={`${classes.paper_root} ${!display && classes.paper_inactive}`}>
                    {display && productContent}
                </Paper>
            </IsVisible>
        );
    }
}

export default withStyles(styles)(Product);