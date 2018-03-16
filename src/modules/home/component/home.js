import React from 'react';
import { Layout, Menu, Icon, Row, Col } from 'antd';
import ZZHeader from 'Comps/zzHeader/zzHeader';
import ZZLeftSide from 'Comps/zzLeftSide/zzLeftSide';
import '../home.less';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Index extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
    };
  }

  render() {
    return (
      <Content>
        <Row type="flex" justify="space-between" align="middle" className="base-info">
          <Col span={6}>
            <div className="base-box">
              <Row type="flex" align="middle">
                <Col><Icon type="cloud" className="icon" style={{backgroundColor: '#2dcb73', color: '#c0efd5'}} /></Col>
                <Col>
                  <h3>5468</h3>
                  <span>New signups</span>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={6}>
            <div className="base-box">
              <Row type="flex" align="middle">
                <Col><Icon type="html5" className="icon" style={{backgroundColor: '#ff604f', color: '#ffcfca'}} /></Col>
                <Col>
                  <h3>2,300</h3>
                  <span>Total equity</span>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={6}>
            <div className="base-box">
              <Row type="flex" align="middle">
                <Col><Icon type="youtube" className="icon" style={{backgroundColor: '#dde1e7', color: '#424445'}} /></Col>
                <Col>
                  <h3>3,823</h3>
                  <span>Views today</span>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={6}>
            <div className="base-box">
              <Row type="flex" align="middle">
                <Col><Icon type="twitter" className="icon" style={{backgroundColor: 'transparent', color: '#000'}} /></Col>
                <Col>
                  <h3>12</h3>
                  <span>Fog Overcast</span>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
          </Col>
          <Col>
          </Col>
          <Col>
          </Col>
        </Row>
      </Content>
    );
  }
}

Index.contextTypes = {  
     router:React.PropTypes.object  
} 

export default  Index;
