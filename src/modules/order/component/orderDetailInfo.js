import React from 'react';
import { Form, Row, Col, Breadcrumb, Icon, Input, InputNumber, Dropdown, Menu, Avatar, Select, Divider, Button, Upload, notification, Steps, Spin } from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../order.less';

const FormItem = Form.Item;
const Step = Steps.Step;
const Option = Select.Option;

const getOrderDetailInfoUrl = restUrl.ADDR + 'Order/getOrderInfo';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

class OrderDetailInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	data: {},
    	coverAttachesFileList: [],
    	loading: true
    };
  }

  componentDidMount = () => {
  	this.getProductDetailInfo();
  }

  //获取产品详情
  getProductDetailInfo = (id) => {
  	let param = {};
  	param.orderId = this.props.params.id;
  	ajax.getJSON(getOrderDetailInfoUrl, param, (data) => {
  		data =  data.backData;
  		let coverAttachesFileList = data.coverAttaches.split(',').map(function(item, index){
  			return restUrl.ADDR + 'UpLoadFile/' + item + '.png';
  		});
		this.setState({
			data,
			coverAttachesFileList,
			loading: false
		});
  	});
  }

  //展示状态
  showState = () => {
  	let {data} = this.state;
  	if(data.state){
  		const index = parseInt(data.state);
  		if(index === 0 || index === 1 || index === 2){
  			return (
  				<Steps progressDot current={index} style={{margin: '20px 0'}}>
				    <Step title="待支付" description="" />
				    <Step title="已支付" description="" />
				    <Step title="已完成" description="" />
				</Steps> 
  			)
  		}else if(index === -1){
  			return (
  				<Steps progressDot current={1} style={{margin: '20px 0'}}>
				    <Step title="待支付" description="" />
				    <Step title="已取消" description="" />
				</Steps> 
  			)
  		}else{
  			return (
  				<Steps progressDot current={0} style={{margin: '20px 0'}}>
				    <Step title="订单异常" description="" />
				</Steps> 
  			)
  		}
  	}else {
  		return (
  			<Steps progressDot current={0} style={{margin: '20px 0'}}>
			    <Step title="待支付" description="" />
			    <Step title="已支付" description="" />
			    <Step title="已完成" description="" />
			</Steps> 
  		)
  	}
  }

  render() {
  	let { data, coverAttachesFileList, loading } = this.state;

    return (
      <div className="zui-cotent">
      	<div className="breadcrumb-block">
	    	<Breadcrumb>
	            <Breadcrumb.Item>首页</Breadcrumb.Item>
	            <Breadcrumb.Item>订单管理</Breadcrumb.Item>
	            <Breadcrumb.Item>订单列表</Breadcrumb.Item>
	            <Breadcrumb.Item>订单详情</Breadcrumb.Item>
	        </Breadcrumb>
	    </div>
      	<div className="ibox-title">
            <h5>订单详情</h5>
        </div>
        <div className="ibox-content">
        	<Spin spinning={loading}>
		      	<Form>
		      		<Divider>订单状态</Divider>
		      		<Row>
		      			<Col span={2}></Col>
		      			<Col span={20}>
		      				{this.showState()}      	
		      			</Col>
		      		</Row>
		      		<Divider>订单信息</Divider>
		      		<Row>
		      			<Col span={12}>
					        <FormItem
					            label="订单号"
					            {...formItemLayout}
					          >
					            <Input 
					            	disabled
					            	value={data.orderNo} 
					            />
					        </FormItem>
					    </Col>
					    <Col span={12}>
					        <FormItem
					            label="订单日期"
					            {...formItemLayout}
					          >
					            <Input 
					            	disabled
					            	value={data.create_time} 
					            />
					        </FormItem>
					    </Col>
				    </Row>
				    <Row>
		      			<Col span={12}>
					        <FormItem
					            label="订单金额"
					            {...formItemLayout}
					          >
					            <InputNumber 
					            	disabled
					            	value={data.payMoney}
					            	precision={2}
					            	formatter={(value) => value + ' 元'}
					            	style={{width: '100%'}}
					            />
					        </FormItem>
					    </Col>
					    <Col span={12}>
					        <FormItem
					            label="预订人"
					            {...formItemLayout}
					          >
					            <Input 
					            	disabled
					            	value={data.userName} 
					            />
					        </FormItem>
					    </Col>
				    </Row>
				    <Row>
		      			<Col span={12}>
					        <FormItem
					            label="预订人电话"
					            {...formItemLayout}
					          >
					            <Input 
					            	disabled
					            	value={data.telephone} 
					            />
					        </FormItem>
					    </Col>
					    <Col span={12}>
					        <FormItem
					            label="安装日期"
					            {...formItemLayout}
					          >
					            <Input 
					            	disabled
					            	value={data.installDate} 
					            />
					        </FormItem>
					    </Col>
				    </Row>
				    <Row>
		      			<Col span={12}>
					        <FormItem
					            label="收货人地址"
					            {...formItemLayout}
					          >
					            <Input 
					            	disabled
					            	value={data.province + data.city + data.county + data.area} 
					            />
					        </FormItem>
					    </Col>		
				    </Row>
				    <Divider>商品信息</Divider>
				    <Row>
		      			<Col span={24}>
		      				<FormItem
					            label="产品封面图"
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
		      		<Row>
		      			<Col span={12}>
		      				<FormItem
					            label="产品名称"
					            {...formItemLayout}
					        >
					            <Input 
					            	disabled
					            	value={data.productName} 
					            />
					        </FormItem>
		      			</Col>
		      			<Col span={12}>
		      				<FormItem
					            label="产品单价"
					            {...formItemLayout}
					        >
					            <Input 
					            	disabled
					            	value={data.price} 
					            />
					        </FormItem>
		      			</Col>
		      		</Row>
		        </Form>
		    </Spin>
	    </div>
      </div>
    );
  }
}

export default OrderDetailInfo;
