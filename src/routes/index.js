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
/* 订单管理 */
import OrderList from '../modules/order/component/orderList';
/* 案例和新闻管理 */
import CaseList from '../modules/news/component/caseList';
import AddCase from '../modules/news/component/addCase';
import NewsList from '../modules/news/component/newsList';
import AddNews from '../modules/news/component/addNews';

module.exports = (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <route path="user/userList" component={UserList} />
        <route path="product/productList" component={ProductList} />
        <route path="product/productDetailInfo/:id" component={ProductDetailInfo} />
        <route path="product/editProduct/:id" component={EditProduct} />
        <route path="product/AddProduct" component={AddProduct} />
        <route path="product/brandAdmin" component={BrandAdmin} />
        <route path="order/orderList" component={OrderList} />
        <route path="news/newsList" component={NewsList} />
        <route path="news/addNews" component={AddNews} />
        <route path="news/caseList" component={CaseList} />
        <route path="news/addCase" component={AddCase} />
    </Route>
);
