import React from 'react';
import { Form, Icon, Row, Col, Input, Button, Checkbox } from 'antd';
import '../login.less';

import loginBg from 'Img/login-bg.jpg';
import logo from 'Img/logo.png';
const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
    };
  }

  componentDidMount = () => {
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // let param = {};
        // param
        console.log('this.context.router === ', this.context.router);
        this.context.router.push('/frame/home');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login">
        <img src={loginBg} className="login-bg" />
        <div className="backup"></div>
        <div className="login-box">
          <Row>
            <Col span={13} style={{height: '400px', backgroundColor: 'rgba(101, 116, 154, .65)'}}>
              <div style={{margin: '85px 0 40px', textAlign: 'center'}}>
                <Icon type="windows" style={{fontSize: 90, color: '#fff'}} />
              </div>
              <div style={{paddingTop: 30, textAlign: 'center', fontSize: 20, color: '#fff'}}>武汉福星宏辉装饰工程有限公司</div>
            </Col>
            <Col span={11} style={{height: '400px', padding: '20px 35px', backgroundColor: '#fff'}}>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  <h1 style={{margin: '15px 0 0 0'}}>欢迎登录</h1>
                  <p style={{margin: '0', color: '#999'}}>Welcome!</p>
                </FormItem>
                <FormItem>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '请输入您的用户名!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} className="login-input" placeholder="用户名" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入您的密码!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" className="login-input" placeholder="密码" />
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                  </Button>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const WrappedLogin = Form.create()(Login);

Login.contextTypes = {  
     router:React.PropTypes.object  
} 

export default  WrappedLogin;
