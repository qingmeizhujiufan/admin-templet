import React from 'react';
import { Row, Col, Icon, Divider, Breadcrumb, Input, Button  } from 'antd';
import ajax from 'Utils/ajax';
import '../product.less';

const getBrandGroupUrl = 'http://www.xuecheh.com/Product/getBrandList';

const Search = Input.Search;

class BrandAdmin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectStructuralSectionOptions: [],
      selectHardwareOptions: [],
      selectSealantOptions: [],
    };
  }

  componentWillMount = () => { 
  }

  componentDidMount = () => { 
    this.getBrandGroup(1);
    this.getBrandGroup(2);
    this.getBrandGroup(3);
  }

  //获取型材、五金、密封胶品牌，type选择
  getBrandGroup = (type) => {
    let param = {};
    param.type = type;
    ajax.getJSON(getBrandGroupUrl, param, (data) => {
      data =  eval('(' + data.backData + ')');
      if(type === 1){
        this.setState({
          selectStructuralSectionOptions: data
        });
      } else if(type === 2) {
        this.setState({
          selectHardwareOptions: data
        });
      } else {
        this.setState({
          selectSealantOptions: data
        });
      }
    });
  }

  render() {
    const { selectStructuralSectionOptions, selectHardwareOptions, selectSealantOptions } = this.state;
    console.log('selectStructuralSectionOptions === ', selectStructuralSectionOptions);
    return (
      <div className="zui-content brandAdmin">
        <div className="breadcrumb-block">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>产品管理</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Row gutter={16}>
          <Col span={8}>
            <div className="ibox-title">
                <h5>门窗品牌</h5>
            </div>
            <div className="ibox-content">
              <Search
                placeholder="请输入品牌名称..."
                onSearch={value => console.log(value)}
                enterButton={<div><Icon type="plus" />添加</div>}
              />
              <ul className="unstyled inline brands">
                {
                  selectStructuralSectionOptions.map((item, index) => {
                    return <li key={index}>
                      <span>{item.name}</span>
                      <span className="del"><Icon type="close-square" /></span>
                    </li>
                  })
                }
              </ul>
            </div>
          </Col>
          <Col span={8}>
            <div className="ibox-title">
                <h5>五金配件品牌</h5>
            </div>
            <div className="ibox-content">
              <Search
                placeholder="请输入品牌名称..."
                onSearch={value => console.log(value)}
                enterButton={<div><Icon type="plus" />添加</div>}
              />
              <ul className="unstyled inline brands">
                {
                  selectHardwareOptions.map((item, index) => {
                    return <li key={index}>
                      <span>{item.name}</span>
                      <span className="del"><Icon type="close-square" /></span>
                    </li>
                  })
                }
              </ul>
            </div>
          </Col>
          <Col span={8}>
            <div className="ibox-title">
                <h5>密封胶品牌</h5>
            </div>
            <div className="ibox-content">
              <Search
                placeholder="请输入品牌名称..."
                onSearch={value => console.log(value)}
                enterButton={<div><Icon type="plus" />添加</div>}
              />
              <ul className="unstyled inline brands">
                {
                  selectSealantOptions.map((item, index) => {
                    return <li key={index}>
                      <span>{item.name}</span>
                      <span className="del"><Icon type="close-square" /></span>
                    </li>
                  })
                }
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

BrandAdmin.contextTypes = {  
  router: React.PropTypes.object  
} 

export default BrandAdmin;