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

    this.state = {
        ad: null
    }
  }

  shouldComponentUpdate(nexProps) {
      if (nexProps.CurrentAd !== this.props.CurrentAd) return false;
      return true;
  }

  componentDidMount() {
    this.getAd();
  }

  getAd = () => {
    const { CurrentAd } = this.props;
    let newAd = Math.floor(Math.random()*1000);

    while (CurrentAd === newAd) newAd = Math.floor(Math.random()*1000);

    this.setState({ad: newAd}, () => this.props.updateViewedAd(newAd))
  }
  
  render() {
    const ad = (
        <React.Fragment>
            <img className="ad" src={`http://localhost:3000/ads/?r=${this.state.ad}`} alt="Sponsor"/>
            <GridListTileBar
                title={`Sponsor ${this.state.ad}`}
            />
        </React.Fragment>
    )
    return (
        <GridListTile>
            {this.state.ad && ad}
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
