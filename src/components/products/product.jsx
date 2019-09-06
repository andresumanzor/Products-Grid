import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = th => ({
    paper: {
        padding: th.spacing(4),
        textAlign: 'center',
        color: th.palette.text.secondary,
    }
});

export class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: true
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.isInViewport);
    }
     
    componentWillUnmount() {
        window.removeEventListener('scroll', this.isInViewport);
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

    isInViewport = () => {
        if (!this.product) return false;
        const rect = this.product.getBoundingClientRect();
        const isVisible = !(window.scrollY > rect.top + 140);
        if (!isVisible) console.log({scrollY: window.scrollY, rect})
        if (!isVisible) this.setState({display: false})
        else if (isVisible) this.setState({display: true})
    }

    render() {
        const { data, classes } = this.props;
        const { price, face, size, date } = data;
        const { display } = this.state
        const { getDate } = this;

        const productContent = (
            <Paper className={classes.paper}>
                <div style={{display:'block'}}><span style={{fontSize: size}}>{face}</span></div>
                <div style={{display:'block'}}>{`$${parseFloat(price).toFixed(2)}`}</div>
                <div style={{display:'block'}}>{getDate(date)}</div>
            </Paper>
        )

        return (
            <Grid item xs={6} ref={(el) => this.product = el}>
                {display ? productContent : (<Paper className={classes.paper}><span>LOADING...</span></Paper>)}
            </Grid>
        );
    }
}

export default withStyles(styles)(Product);