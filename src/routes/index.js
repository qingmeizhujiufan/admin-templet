import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from '../modules/App';

/* 公共首页 */
import Index from '../modules/pub/index/component/index';

/* 设备项目部
 *  create by zhongzheng
 */ 
/* 设备项目部首页 */ 
import IndexDevice from '../modules/device/index/component/index';

module.exports = (
    <Route path="/" component={App}>
        <IndexRoute component={IndexDevice}/>
        <route path="device/index" component={Index} />
    </Route>
);
