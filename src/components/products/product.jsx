import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

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
        const isVisible = !(rect.top <= -64); //using the topBar as the limit for the object's hidden piece
        
        console.log({scrollY: window.scrollY, rect, data: this.props.data})
        if (!isVisible) this.setState({display: false})
        else if (isVisible) this.setState({display: true})
    }

    render() {
        const { data, classes } = this.props;
        const { price, face, size, date } = data;
        const { display } = this.state
        const { getDate } = this;

        const productContent = (
            <React.Fragment>
                <div style={{display:'block'}}><span style={{fontSize: size}}>{face}</span></div>
                <div style={{display:'block'}}>{`$${parseFloat(price).toFixed(2)}`}</div>
                <div style={{display:'block'}}>{getDate(date)}</div>
            </React.Fragment>
        )

        return (
            <Grid item xs={6} ref={(el) => this.product = el}>
                <Paper className={`${classes.paper_root} ${!display && classes.paper_inactive}`}>
                    {display && productContent}
                </Paper>
            </Grid>
        );
    }
}

export default withStyles(styles)(Product);