import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    updateViewedAd
} from '../actions';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

export class Ad extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nexProps) {
      if (nexProps.CurrentAd !== this.props.CurrentAd) return false;
      return true;
  }

  getAd = () => {
    const { CurrentAd } = this.props;
    let newAd = Math.floor(Math.random()*1000);

    while (CurrentAd === newAd) newAd = Math.floor(Math.random()*1000);

    this.props.updateViewedAd(newAd);
    return newAd;
  }
  
  render() {
    return (
        <GridListTile>
            <img className="ad" src={`http://localhost:3000/ads/?r=${this.getAd()}`} alt="Sponsor"/>
            <GridListTileBar
                title='Sponsor'
            />
        </GridListTile>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateViewedAd
    },
    dispatch
  );
}

function mapStateToProps(state) {
  const { ad } = state;
  return {
    CurrentAd: ad.current
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Ad);
