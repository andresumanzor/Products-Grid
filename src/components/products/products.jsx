import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import Pagination from "material-ui-flat-pagination";
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
      sortBy: 'Default'
    };
  }


  componentDidMount() {
    this.props.fetchProducts(this.state.page);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.Products.nextDataPage !== state.nextDataPage) 
      return { nextData: props.Products.nextData, nextDataPage: props.Products.nextDataPage }
    return false;
  }

  fetchNextPage = () => {
    const { page, sortBy } = this.state;
    const { Products } = this.props;
    const { nextData, nextDataPage } = Products;

    if (page === nextDataPage && nextData) 
      this.props.updateProducts(page, sortBy, nextData)
    else this.props.fetchProducts(page, sortBy)

    window.scroll({top: 0, behavior: 'smooth'});
  }

  updatePageNumber = (page) => {
    const pageNumberWithPaginatorOffset = page + 1;
    this.setState({
      page: pageNumberWithPaginatorOffset
    }, () => this.fetchNextPage());
  }

  updateSortBy = (sortBy) => {
    this.setState({
      sortBy
    }, () => this.props.fetchProducts(this.state.page, this.state.sortBy));
  }

  render() {
    const { updatePageNumber, updateSortBy } = this;
    const { page, sortBy } = this.state;
    const { Products, classes } = this.props;
    const { data, beingFetched, nextData } = Products;
    
    if (data && data.length === 0) return <div>Error while retrieving from server...</div>
    
    const loader = (
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{height: '100%'}}
      >
        <img src="../../../assets/loading/dual_ring.svg"/>
      </Grid>
    )

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

    const paginator = (
      <Pagination
        limit={1}
        offset={page - 1}
        total={25}
        onClick={(e, page) => updatePageNumber(page)}
      />
    )

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
            ? loader
            : data.map((product, productKey) => <Product key={`product_${page}_${productKey}`} data={product}/>)}
          {(nextData && nextData.length === 0) && (
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
          <Grid
            container
            item
            xs={12}
            justify="center"
            alignItems="center"
          >
            {paginator}  
          </Grid>
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
