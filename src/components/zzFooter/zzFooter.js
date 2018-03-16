import React from 'react';
import { Layout } from 'antd';
import './zzFooter.less';

const { Footer } = Layout;

class ZZFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2016 Created by Ant UED
      </Footer>
    );
  }
}

export default ZZFooter;
