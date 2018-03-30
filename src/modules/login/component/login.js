import React from 'react';
import { Layout, Menu, Icon, Row, Col, Steps, Carousel, Progress, Timeline, Card } from 'antd';
import '../login.less';

class Login extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
    };
  }

  componentDidMount = () => {
  }

  render() {
    return (
      <div className="zui-content login">
        
      </div>
    );
  }
}

Login.contextTypes = {  
     router:React.PropTypes.object  
} 

export default  Login;
