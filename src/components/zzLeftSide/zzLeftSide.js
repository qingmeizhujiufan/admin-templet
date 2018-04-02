import React from 'react';
import { Link } from 'react-router';
import { Layout, Icon, Menu } from 'antd';
import _ from 'lodash';
import menuTree from './menu';
import './zzLeftSide.less';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class ZZLeftSide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultSelectedKeys: '1',
      collapsed: this.props.collapsed,
    };
  }

  componentWillMount = () => {
    let that = this;
    let hashUrl = location.hash.split('#')[1];
    
    _.forEach(menuTree, function(item){
      if(item.children){
        _.find(item.children, function(subItem){
          if(subItem.link.indexOf(hashUrl) > -1){
            that.setState({defaultSelectedKeys: subItem.key});
          }
        });
      } else {
        if(item.link.indexOf(hashUrl) > -1){
          that.setState({defaultSelectedKeys: item.key});
        }
      }
    });
  }

  buildMenu = () => {
    return menuTree.map(function(item, index){
      if(item.children){
        return (
          <SubMenu
            key={item.key}
            title={<span><Icon type={item.iconType} /><span>{item.label}</span></span>}
          >
          {
            item.children.map(function(subItem, subIndex){
              return (
                <Menu.Item key={subItem.key}>
                  <Link to={subItem.link}>{subItem.label}</Link>
                </Menu.Item>
              )
            })
          }
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.link}>
              <Icon type={item.iconType} />
              <span>{item.label}</span>
            </Link>
          </Menu.Item>
        )
      }
    });
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ collapsed: nextProps.collapsed });
  }

  render() {
    let { defaultSelectedKeys } = this.state;
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
          defaultSelectedKeys={[defaultSelectedKeys]} 
          mode="inline"
          defaultOpenKeys={['3', '4', '5']}
        >
          {this.buildMenu()}
        </Menu>
      </Sider>
    );
  }
}

ZZLeftSide.contextTypes = {  
     router:React.PropTypes.object  
} 

export default ZZLeftSide;
