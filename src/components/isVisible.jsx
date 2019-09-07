import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

export class IsVisible extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.isInViewport);
    }
     
    componentWillUnmount() {
        window.removeEventListener('scroll', this.isInViewport);
    }

    isInViewport = () => {
        if (!this.node) return false;
        const { onShow, onHide, isDisplayed } = this.props;
        
        const rect = this.node.getBoundingClientRect();
        const isVisible = !(rect.top <= -64 || rect.top >= window.innerHeight - rect.height/2.5); //using the topBar as the limit for the object's hidden piece\

        if (!isVisible && onHide && isDisplayed) onHide();
        else if (isVisible && onShow && !isDisplayed) onShow();
    }

    render() {

        return (
            <Grid item xs={6} ref={(el) => this.node = el}>
                {this.props.children}
            </Grid>
        );
    }
}

export default IsVisible;