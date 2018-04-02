import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Affix, Icon, Input, Dropdown, Menu, Avatar } from 'antd';
import './zzHeader.less';

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/login">退出登录</Link>
    </Menu.Item>
  </Menu>
);

class ZZHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };
  }

  toggle = () => {
    let { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });

    return this.props.switchCollapsed(!collapsed);
  }

  render() {
    return (
      <header className="zui-header">
        <Row type="flex" justify="space-between" align="middle" style={{height: '100%'}}>
          <Col span={2}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Col>
          <Col span={10}>
          </Col>
          <Col span={12} style={{textAlign: 'right'}}>
            <Input
              className="input-search"
              placeholder="别说话，搜我..."
              prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,1)', fontSize: 16, fontWeight: 600 }} />}
              style={{ width: 200 }}
            />
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link">
                <Avatar style={{ verticalAlign: '-6px', backgroundColor: '#fc5a59' }} size="small" icon="user" /> 管理员<Icon type="down" />
              </a>
            </Dropdown>
          </Col>
        </Row>
      </header>
    );
  }
}

export default ZZHeader;
