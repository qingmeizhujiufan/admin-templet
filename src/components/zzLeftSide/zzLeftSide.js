import React from 'react';
import { Layout, Icon, Menu } from 'antd';
import _ from 'lodash';
import './zzLeftSide.less';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const routerList = [
  {
    key: '1',
    url: '/'
  },
  {
    key: '2',
    url: 'user/userList'
  },
  {
    key: '3_1',
    url: 'product/productList'
  },
  {
    key: '3_2',
    url: 'product/addProduct'
  },
  {
    key: '3_3',
    url: 'product/brandAdmin'
  },
  {
    key: '4',
    url: 'product/productList'
  }
];

class ZZLeftSide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  onSelect = (item) => {
    let router = _.find(routerList, {key: item.key});
    console.log('router === ', router);
     this.context.router.push(router.url);
  }

  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        className="left-side"
      >
        <div className="logo">ADMIN</div>
        <Menu 
          theme="dark" 
          defaultSelectedKeys={['1']} 
          mode="inline" 
          onSelect={this.onSelect}>
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>首页</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>人员管理</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={<span><Icon type="user" /><span>产品管理</span></span>}
          >
            <Menu.Item key="3_1">产品列表</Menu.Item>
            <Menu.Item key="3_2">添加产品</Menu.Item>
            <Menu.Item key="3_3">品牌管理</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={<span><Icon type="team" /><span>Team</span></span>}
          >
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <Icon type="file" />
            <span>File</span>
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
