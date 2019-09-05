import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    fetchProducts
} from '../../actions';
import Grid from '@material-ui/core/Grid';
import Product from './product';
import {faces} from 'cool-ascii-faces'; //----------------Remove once done testing ui

export class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: null,
      page: 1
    };
  }


  componentDidMount() {
    this.props.fetchProducts(this.state.page);
  }

  componentDidUpdate(prevProps, prevState) {
    
  }
//----------------Remove once done testing ui
getRandomString = () => {
    return (Math.random()).toString(36).substr(2);
}

getRandomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}
//----------------Remove once done testing ui

  render() {
    const { page } = this.state;
    const { Products } = this.props;
    let { data, beingFetched } = Products; //----------------change once done testing ui
    console.log('result:', Products)

    if (!data || beingFetched) return <div>Loading...</div>

    // if (data.length === 0) return <div>Error while retrieving...</div>
    //----------------Remove once done testing ui
    data = [];

    for (let i = 0; i < 500; i++) {
      data.push({
        id: this.getRandomInRange(0, 100000) + '-' + this.getRandomString(),
        size: this.getRandomInRange(12, 40),
        price: this.getRandomInRange(1, 1000),
        face: faces[Math.floor(Math.random() * 499) % faces.length],
        date: new Date(Date.now() - this.getRandomInRange(1, 1000 * 3600 * 24 * 15)).toString()
      })
    }
    //----------------Remove once done testing ui

    console.log({data})

    return (
        <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
            spacing={3}
        >
            {data.map((product, productKey) => <Product key={`product_${page}_${productKey}`} data={product}/>)}
        </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchProducts
    },
    dispatch
  );
}

function mapStateToProps(state) {
  const { products } = state;
  return {
    Products: products
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
