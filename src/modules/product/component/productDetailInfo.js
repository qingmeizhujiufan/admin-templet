import React from 'react';
import { Form, Row, Col, Breadcrumb, Icon, Input, InputNumber, Dropdown, Menu, Avatar, Select, Divider, Button, Upload, notification } from 'antd';
import ajax from 'Utils/ajax';
import '../product.less';

const FormItem = Form.Item;
const Option = Select.Option;

const getProductDetailInfoUrl = 'http://www.xuecheh.com/Product/getProductInfo';
const getBrandGroupUrl = 'http://www.xuecheh.com/Product/getBrandList';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

class ProductDetailInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	data: {},
    	attachesFileList: [],
    	coverAttachesFileList: [],
    };
  }

  componentDidMount = () => {
  	this.getProductDetailInfo();
  }

  //获取产品详情
  getProductDetailInfo = (id) => {
  	let param = {};
  	param.id = this.props.params.id;
  	ajax.getJSON(getProductDetailInfoUrl, param, (data) => {
  		data =  data.backData;
  		let attachesFileList = data.attaches.split(',').map(function(item, index){
  			return 'http://www.xuecheh.com/UpLoadFile/' + item + '.png';
  		});
  		let coverAttachesFileList = data.coverAttaches.split(',').map(function(item, index){
  			return 'http://www.xuecheh.com/UpLoadFile/' + item + '.png';
  		});
		this.setState({
			data,
			attachesFileList,
			coverAttachesFileList
		});
  	});
  }

  render() {
  	let { data, attachesFileList, coverAttachesFileList } = this.state;

    return (
      <div className="zui-cotent">
      	<div className="breadcrumb-block">
	    	<Breadcrumb>
	            <Breadcrumb.Item>首页</Breadcrumb.Item>
	            <Breadcrumb.Item>产品管理</Breadcrumb.Item>
	            <Breadcrumb.Item>产品列表</Breadcrumb.Item>
	            <Breadcrumb.Item>产品详情</Breadcrumb.Item>
	        </Breadcrumb>
	    </div>
      	<div className="ibox-title">
            <h5>产品详情</h5>
        </div>
        <div className="ibox-content">
	      	<Form>
	      		<Divider>封面信息</Divider>
	      		<Row>
	      			<Col span={24}>
	      				<FormItem
				            label="封面图片"
				            labelCol={{span: 3}}
				            wrapperCol={{span: 21}}
				          >
				            <ul className="unstyled inline detail-imglist">
				            	{
				            		coverAttachesFileList.map(function(item, index){
				            			return (
				            				<li key={index}>
				            					<img src={item} />
				            				</li>
				            			)
				            		})
				            	}
				            </ul>
				        </FormItem>	      	
	      			</Col>
	      		</Row>
	      		<Divider>基本信息</Divider>
	      		<Row>
	      			<Col span={12}>
				        <FormItem
				            label="产品名称"
				            {...formItemLayout}
				          >
				            <Input 
				            	disabled
				            	value={data.name} 
				            />
				        </FormItem>
				    </Col>
				    <Col span={12}>
				        <FormItem
				            label="产品类别"
				            {...formItemLayout}
				          >
				            <Input 
				            	disabled
				            	value={data.type} 
				            />
				        </FormItem>
				    </Col>
			    </Row>
			    <Row>
	      			<Col span={12}>
				        <FormItem
				            label="单价"
				            {...formItemLayout}
				          >
				            <InputNumber 
				            	disabled
				            	value={data.price}
				            	precision={2}
				            	formatter={(value) => value + ' 元'}
				            	style={{width: '100%'}}
				            />
				        </FormItem>
				    </Col>
				    <Col span={12}>
				        <FormItem
				            label="产品规格"
				            {...formItemLayout}
				          >
				            <Input 
				            	disabled
				            	value={data.unit} 
				            />
				        </FormItem>
				    </Col>
			    </Row>
			    <Row>
	      			<Col span={12}>
				        <FormItem
				            label="型材品牌"
				            {...formItemLayout}
				          >
				            <Input 
				            	disabled
				            	value={data.structuralSection} 
				            />
				        </FormItem>
				    </Col>
				    <Col span={12}>
				        <FormItem
				            label="五金配件"
				            {...formItemLayout}
				          >
				            <Input 
				            	disabled
				            	value={data.hardware} 
				            />
				        </FormItem>
				    </Col>
			    </Row>
			    <Row>
	      			<Col span={12}>
				        <FormItem
				            label="密封胶品牌"
				            {...formItemLayout}
				          >
				            <Input 
				            	disabled
				            	value={data.sealant} 
				            />
				        </FormItem>
				    </Col>
				    <Col span={12}>
				        <FormItem
				            label="说明"
				            {...formItemLayout}
				          >
				            <Input.TextArea
				            	disabled
				            	value={data.detail}
				            	autosize={{minRows: 4, maxRows: 6}} />
				        </FormItem>
				    </Col>
			    </Row>
			    <Divider>详情信息</Divider>
			    <Row>
	      			<Col span={24}>
	      				<FormItem
				            label="详情图片"
				            labelCol={{span: 3}}
				            wrapperCol={{span: 21}}
				          >
				            <ul className="unstyled inline detail-imglist">
				            	{
				            		attachesFileList.map(function(item, index){
				            			return (
				            				<li key={index}>
				            					<img src={item} />
				            				</li>
				            			)
				            		})
				            	}
				            </ul>
				        </FormItem>	      	
	      			</Col>
	      		</Row>
	        </Form>
	    </div>
      </div>
    );
  }
}

export default ProductDetailInfo;
