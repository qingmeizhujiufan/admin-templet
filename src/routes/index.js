import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../modules/App';

/* 首页 */
import Home from '../modules/home/component/home';
/* 人员管理 */
import UserList from '../modules/user/component/userList';

import IndexDevice from '../modules/device/index/component/index';

module.exports = (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <route path="user/userList" component={UserList} />
    </Route>
);
