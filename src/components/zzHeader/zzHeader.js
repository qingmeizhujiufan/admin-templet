import React from 'react';
import { Row, Col, Icon, Input, Dropdown, Menu } from 'antd';
import './zzHeader.less';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
    </Menu.Item>
  </Menu>
);

class ZZHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="zui-header">
        <Row type="flex" justify="space-between" align="middle" style={{height: '100%'}}>
          <Col span={12}>
            <Input.Search
              placeholder="搜索..."
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
          </Col>
          <Col span={12} style={{textAlign: 'right'}}>
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
                ADMIN<Icon type="down" />
              </a>
            </Dropdown>
          </Col>
        </Row>
      </header>
    );
  }
}

export default ZZHeader;
