import React from 'react';
import TopBar from './topBar';
import Products from './products/products';

export default 
    ({}) => {
  
    return (
        <div style={{height: '100vh'}}>
          <TopBar/>
          <div className='app-container'>
            <Products/>
          </div>
        </div>
    );
};