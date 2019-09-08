import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import {
    fetchProducts,
    updateProducts
} from '../../actions';
import Grid from '@material-ui/core/Grid';
import Product from './product';
import Ad from '../ad'

const styles = th => ({
  sortBy: {
      minWidth: '75px'
  }
});

export class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      sortBy: '',
      data: null
    };
  }


  componentDidMount() {
    this.props.fetchProducts(this.state.page);
    document.addEventListener('scroll', this.isBottom);
  }
  
  componentWillUnmount() {
    document.removeEventListener('scroll', this.isBottom);
  }

  static getDerivedStateFromProps(props, state) {
    const data = state.data || [];
    const propsData = props.Products.data;
    const { nextDataPage, nextData } = props.Products;
    let newState = {};

    if (propsData && !_.isEqual(propsData, data))
      if (state.page === 1) return {data: propsData}
      else newState = {data: [...data, ...propsData]}
    if (nextDataPage !== state.nextDataPage) 
      newState = {...newState, nextData, nextDataPage }
    return newState;
  }

  isBottom = () => {
    if (!this.productsContainer) return false;
    const productsContainerRect = this.productsContainer.getBoundingClientRect();
    const isBottom = window.innerHeight - this.productsContainer.scrollHeight === productsContainerRect.y;
    
    if (!this.props.Products.beingFetched && isBottom && (!this.props.Products.nextData || this.props.Products.nextData.length !== 0)) {
      window.scrollBy(0, -100);
      this.updatePageNumber();
    }
  };

  fetchNextPage = () => {
    const { page, sortBy } = this.state;
    const { Products } = this.props;
    const { nextData, nextDataPage } = Products;

    if (page === nextDataPage && nextData) 
      this.props.updateProducts(page, sortBy, nextData)
    else this.props.fetchProducts(page, sortBy)
  }

  updatePageNumber = () => {
    this.setState({
      page: this.state.page + 1
    }, () => this.fetchNextPage());
  }

  updateSortBy = (sortBy) => {
    this.setState({
      data: null,
      page: 1,
      sortBy
    }, () => this.props.fetchProducts(this.state.page, this.state.sortBy));
  }

  renderProduct = (product, productKey) => {
    const { page } = this.state;
    const key = productKey + 1
    const mod = 20;
    if (key !== 0 && (key % mod === 0)) {
      return (
        <React.Fragment key={`product_${page}_${key}`}>
          <Product data={product}/>
          <Grid item container justify="center" alignItems="center">
            <Ad adKey={key > mod ? (key/mod) - 1 : 0}/>
          </Grid>
        </React.Fragment>
      )
    } else return <Product key={`product_${page}_${key}`} data={product}/>
  }

  renderLoader = (height = 'auto') => {
    return <img src="../../../assets/loading/dual_ring.svg" style={{height}}/>
  }

  render() {
    const { updatePageNumber, updateSortBy, renderProduct, renderLoader } = this;
    const { page, sortBy, data } = this.state;
    const { Products, classes } = this.props;
    const { beingFetched, nextData } = Products;
    
    if (data && data.length === 0) return <div>Error while retrieving from server...</div>

    const sort = (
      <FormControl>
        <Select
          value={sortBy}
          onChange={(e) => updateSortBy(e.target.value)}
          displayEmpty
          name="age"
          className={classes.sortBy}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'size'}>Size</MenuItem>
          <MenuItem value={'price'}>Price</MenuItem>
          <MenuItem value={'id'}>ID</MenuItem>
        </Select>
        <FormHelperText>Sort By</FormHelperText>
      </FormControl>
    );

    const endMessage = (
      <span>~ end of catalogue ~</span>
    )

    return (
        <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
            spacing={3}
            style={{paddingTop: '15px', height: '100vh'}}
            ref={(el) => this.productsContainer = el}
        >
          <Grid
            container
            item
            xs={12}
            justify="flex-end"
            alignItems="center"
          >
            {sort}
          </Grid>

          { !data || beingFetched
            ? (
              <Grid
                container
                alignItems="center"
                justify="center"
                style={{height: '100%'}}
              >{renderLoader()}</Grid>
            )
            : data.map(renderProduct)}

          {(nextData && nextData.length !== 0) 
          ? (
            <Grid
              container
              alignItems="center"
              justify="center"
            >{renderLoader('50px')}</Grid>
          )
          :(
            <Grid
              container
              item
              xs={12}
              justify="center"
              alignItems="center"
            >
              {endMessage} 
            </Grid>
          )}
        </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchProducts,
      updateProducts
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

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(Products));
