import React from 'react';
import { Link } from 'react-router';
import { Layout, Icon, Menu } from 'antd';
import _ from 'lodash';
import './zzLeftSide.less';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class ZZLeftSide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: this.props.collapsed,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ collapsed: nextProps.collapsed });
  }

  render() {
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
        className="left-side"
      >
        <div className="logo">ADMIN</div>
        <Menu 
          theme="dark" 
          defaultSelectedKeys={['1']} 
          mode="inline"
          defaultOpenKeys={['sub1', 'sub2', 'sub3']}
        >
          <Menu.Item key="1">
            <Link to="/">
              <Icon type="home" />
              <span>首页</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={<span><Icon type="switcher" /><span>产品管理</span></span>}
          >
            <Menu.Item key="3_1">
              <Link to="/product/productList">产品列表</Link>
            </Menu.Item>
            <Menu.Item key="3_2">
              <Link to="/product/addProduct">添加产品</Link>
            </Menu.Item>
            <Menu.Item key="3_3">
              <Link to="/product/brandAdmin">品牌管理</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={<span><Icon type="line-chart" /><span>订单管理</span></span>}
          >
            <Menu.Item key="4_1">
              <Link to="/order/orderList">订单列表</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={<span><Icon type="credit-card" /><span>案例和新闻管理</span></span>}
          >
            <Menu.Item key="5_1">
              <Link to="/news/caseList">案例列表</Link>
            </Menu.Item>
            <Menu.Item key="5_2">
              <Link to="/news/addCase">添加案例</Link>
            </Menu.Item>
            <Menu.Item key="5_3">
              <Link to="/news/newsList">新闻列表</Link>
            </Menu.Item>
            <Menu.Item key="5_4">
              <Link to="/news/addNews">添加新闻</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="2">
            <Link to="/user/userList">
              <Icon type="user" />
              <span>人员管理</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

ZZLeftSide.contextTypes = {  
     router:React.PropTypes.object  
} 

export default ZZLeftSide;
