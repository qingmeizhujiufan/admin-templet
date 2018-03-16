import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../modules/App';

/* 首页 */
import Home from '../modules/home/component/home';
/* 人员管理 */
import UserList from '../modules/user/component/userList';
/* 产品管理 */
import ProductList from '../modules/product/component/productList';
import ProductDetailInfo from '../modules/product/component/productDetailInfo';
import EditProduct from '../modules/product/component/editProduct';
import AddProduct from '../modules/product/component/addProduct';
import BrandAdmin from '../modules/product/component/brandAdmin';

module.exports = (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <route path="user/userList" component={UserList} />
        <route path="product/productList" component={ProductList} />
        <route path="product/productDetailInfo/:id" component={ProductDetailInfo} />
        <route path="product/editProduct/:id" component={EditProduct} />
        <route path="product/AddProduct" component={AddProduct} />
        <route path="product/brandAdmin" component={BrandAdmin} />
    </Route>
);
