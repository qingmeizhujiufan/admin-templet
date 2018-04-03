import React from 'react';
import { Form, Row, Col, Icon, Input, InputNumber, Dropdown, Menu, Avatar, Select, Divider, Button, Upload, notification, Spin } from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../product.less';

const FormItem = Form.Item;
const Option = Select.Option;

const getBrandGroupUrl = restUrl.ADDR + 'Product/getBrandList';
const saveProductUrl = restUrl.ADDR + 'Product/saveProduct';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

class AddProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	price: 100,
    	selectStructuralSectionOptions: [],
    	selectHardwareOptions: [],
    	selectSealantOptions: [],
    	structuralSection: '',
    	hardware: '',
    	sealant: '',
    	loading: false,
    	loading_1: true,
    	loading_2: true,
    };
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
  				selectStructuralSectionOptions: data,
  				loading_1: false
  			});
  		} else if(type === 2) {
  			this.setState({
  				selectHardwareOptions: data,
  				loading_2: false
  			});
  		} else {
  			this.setState({
  				selectSealantOptions: data,
  				loading_3: false
  			});
  		}
  	});
  }

  //填充select下拉选项
  fillOptions = (list) => {
  	list = list || [];

  	return list.map(function(item, index){
  			return <Option key={index} value={item.name}>{item.name}</Option>
  		})
  }

  handleSelectChange = (value, option, type) => {
  	console.log('value === ', value);
  	console.log('option === ', option);
  	console.log('type === ', typeof type);
  	if(type === 1){
  		this.setState({
			structuralSection: value
		});
  	} else if(type === 2){
		this.setState({
			hardware: value
		});
  	} else {
  		this.setState({
			sealant: value
		});
  	}
  } 

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let param = {};
        param.name = values.name;
        param.type = values.type;
        param.price = values.price;
        param.unit = values.unit;
        param.structuralSection = values.structuralSection;
        param.hardware = values.hardware;
        param.sealant = values.sealant;
        param.detail = values.detail;
        param.coverAttaches = values.coverAttaches.fileList.map((item, index) => {
        	return item.response.data.id;
        }).join(',');
        param.attaches = values.attaches ? (values.attaches.fileList.map((item, index) => {
        	return item.response.data.id;
        }).join(',')) : '';
        console.log('handleSubmit  param === ', param);
        
        ajax.postJSON(saveProductUrl, JSON.stringify(param), (data) => {
        	notification.open({
		        message: '新增产品成功！',
		        description: '恭喜，又上架一款产品。',
		        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
		    });
		    this.context.router.push('/frame/product/productList');
        });
      }
    });
  }

  saveProduct = () => {
  	this.setState({
  		loading: true
  	});
  }

  render() {
  	let { price, selectStructuralSectionOptions, selectHardwareOptions, selectSealantOptions, structuralSection, hardware, sealant, loading_1, loading_2, loading_3 } = this.state;
  	const { getFieldDecorator, setFieldsValue } = this.props.form;

  	if(structuralSection === ''){
  		structuralSection = selectStructuralSectionOptions.length > 0 ? selectStructuralSectionOptions[0].name : '';
  	}
  	if(hardware === ''){
  		hardware = selectHardwareOptions.length > 0 ? selectHardwareOptions[0].name : '';
  	}
  	if(sealant === ''){
		sealant = selectSealantOptions.length > 0 ? selectSealantOptions[0].name : '';
	}

    return (
      <div className="zui-cotent">
      	<div className="ibox-title">
            <h5>新增产品</h5>
        </div>
        <div className="ibox-content">
	      	<Form onSubmit={this.handleSubmit}>
	      		<Divider>封面信息</Divider>
	      		<Row>
	      			<Col span={24}>
	      				<FormItem
				            label="封面上传"
				            labelCol={{span: 3}}
				            wrapperCol={{span: 21}}
				          >
				          	{getFieldDecorator('coverAttaches', {
			                    rules: [{ required: true, message: '封面图片不能为空!' }],
			                })(
					            <Upload
					            	action={restUrl.UPLOAD}
								    listType={'picture'}
								    multiple={true}
								    className='upload-list-inline'
					            >
							      <Button><Icon type="upload" /> 上传</Button>
							    </Upload>
							)}
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
				        	{getFieldDecorator('name', {
			                    rules: [{ required: true, message: '产品名称不能为空!' }],
			                })(
				            	<Input placeholder="" />
				            )}
				        </FormItem>
				    </Col>
				    <Col span={12}>
				        <FormItem
				            label="产品类别"
				            {...formItemLayout}
				        >
				        	{getFieldDecorator('type', {
			                    rules: [{ required: true, message: '产品类别不能为空!' }],
			                })(
			                    <Input placeholder="" />
			                )}
				        </FormItem>
				    </Col>
			    </Row>
			    <Row>
	      			<Col span={12}>
				        <FormItem
				            label="单价"
				            {...formItemLayout}
				        >
				        	{getFieldDecorator('price', {
			                    rules: [{ required: true, message: '单价信息不能为空!' }],
			                })(
					            <InputNumber
					            	precision={2}
					            	formatter={(value) => value + ' 元'}
					            	style={{width: '100%'}}
					            />
					        )}
				        </FormItem>
				    </Col>
				    <Col span={12}>
				        <FormItem
				            label="产品规格"
				            {...formItemLayout}
				        >
				        	{getFieldDecorator('unit', {
			                    rules: [{ required: true, message: '产品规格不能为空!' }],
			                })(
				            	<Input placeholder="" />
				            )}
				        </FormItem>
				    </Col>
			    </Row>
			    <Row>
	      			<Col span={12}>	    
				        <FormItem
				            label="型材品牌"
				            {...formItemLayout}
				         >
				          	<Spin spinning={loading_1} indicator={<Icon type="loading" />}>
				          		{getFieldDecorator('structuralSection', {
				                    rules: [{ required: false }],
				                    initialValue: structuralSection
				                })(				              
						            <Select
						            >
						              {this.fillOptions(selectStructuralSectionOptions)}
						            </Select>
						        )}
				            </Spin>
				        </FormItem>
				    </Col>
				    <Col span={12}>
				        <FormItem
				            label="五金配件"
				            {...formItemLayout}
				         >
				         	<Spin spinning={loading_2} indicator={<Icon type="loading" />}>
					            {getFieldDecorator('hardware', {
				                    rules: [{ required: false }],
				                    initialValue: hardware
				                })(
						            <Select
						            >
						              {this.fillOptions(selectHardwareOptions)}
						            </Select>
						        )}
					        </Spin>
				        </FormItem>
				    </Col>
			    </Row>
			    <Row>
	      			<Col span={12}>
				        <FormItem
				            label="密封胶品牌"
				            {...formItemLayout}
				        >
				          	<Spin spinning={loading_3} indicator={<Icon type="loading" />}>
					            {getFieldDecorator('sealant', {
				                    rules: [{ required: false }],
				                    initialValue: sealant
				                })(
						            <Select
						            >
						              {this.fillOptions(selectSealantOptions)}
						            </Select>
						        )}
					        </Spin>
				        </FormItem>
				    </Col>
				    <Col span={12}>
				        <FormItem
				            label="说明"
				            {...formItemLayout}
				        >
				        	{getFieldDecorator('detail', {
			                    rules: [{ required: false }],
			                })(
				            	<Input.TextArea autosize={{minRows: 4, maxRows: 6}} />
				           	)}
				        </FormItem>
				    </Col>
			    </Row>
			    <Divider>详情信息</Divider>
	      		<Row>
	      			<Col span={24}>
	      				<FormItem
				            label="详情图片上传"
				            labelCol={{span: 3}}
				            wrapperCol={{span: 21}}
				        >
				        	{getFieldDecorator('attaches', {
			                    rules: [{ required: false }]
			                })(
					            <Upload
					            	action={restUrl.UPLOAD}
								    listType={'picture'}
								    multiple={true}
								    className='upload-list-inline'
					            >
							      <Button><Icon type="upload" /> 上传</Button>
							    </Upload>
							)}
				        </FormItem>	      	
	      			</Col>
	      		</Row>
			    <Divider></Divider>
			    <Row type="flex" justify="center">
			    	<Col>
			    		<Button type="primary" htmlType="submit">
				          提交
				        </Button>
			    	</Col>
			    </Row>
	        </Form>
	    </div>
      </div>
    );
  }
}

const WrappedAddProduct = Form.create()(AddProduct);
AddProduct.contextTypes = {  
     router:React.PropTypes.object  
} 

export default WrappedAddProduct;
