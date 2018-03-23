import React from 'react';
import { Layout, Menu, Icon, Row, Col, Steps, Carousel, Progress, Timeline } from 'antd';
import ZZHeader from 'Comps/zzHeader/zzHeader';
import ZZLeftSide from 'Comps/zzLeftSide/zzLeftSide';
import '../home.less';
import profile from 'Img/profile-cover.jpg';
import cover from 'Img/cover.jpg';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const Step = Steps.Step;

class Index extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
    };
  }

  render() {
    return (
      <div className="zui-content home">
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
        <Row gutter={16}>
          <Col span={9}>
            <div className="slider-box">
              <Carousel autoplay>
                <div><img src={profile} /></div>
                <div><img src={cover} /></div>
              </Carousel>
              <div className="footer">这是首页轮播图</div>
            </div>
          </Col>
          <Col span={10}>
            <div className="ibox-title">
                <h5>订单情况</h5>
            </div>
            <div className="ibox-content">
              <Row type="flex" justify="space-between" align="top">
                <Col span={8}>
                  <Progress type="dashboard" percent={75} format={(percent)=> percent + '%'} />
                  <div>
                    <h3>完成率</h3>
                    <p>这是说明</p>
                  </div>
                </Col>
                <Col span={8}>
                  <Progress type="dashboard" percent={70} status="exception" format={(percent)=> percent + '%'} />
                  <div>
                    <h3>取消率</h3>
                    <p>这是说明</p>
                  </div>
                </Col>
                <Col span={8}>
                  <Progress type="dashboard" percent={80} status="success" format={(percent)=> percent + '%'} />
                  <div>
                    <h3>支付达成率</h3>
                    <p>这是说明</p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={5}>
            <div className="ibox-title">
                <h5>项目进度</h5>
            </div>
            <div className="ibox-content">
              <Steps direction="vertical" current={1}>
                <Step title="Finished" description="This is a description." />
                <Step title="In Progress" description="This is a description." />
                <Step title="Waiting" description="This is a description." />
              </Steps>
            </div>
          </Col>
        </Row>
        <Row gutter={16} style={{marginTop: '15px'}}>
          <Col span={7}>
            <div className="ibox-title" style={{backgroundColor: '#fc5a59'}}>
                <h5 style={{color: '#fff'}}>这是标题</h5>
            </div>
            <div className="ibox-content">
              <Timeline>
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">Technical testing 2015-09-01</Timeline.Item>
                <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
              </Timeline>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

Index.contextTypes = {  
     router:React.PropTypes.object  
} 

export default  Index;
