import React from 'react';
import { Form, Row, Col, Breadcrumb, Icon, Input, InputNumber, Dropdown, Menu, Avatar, Select, Divider, Button, Upload, notification, Steps, Spin } from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../news.less';

import { EditorState, convertFromRaw, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const FormItem = Form.Item;
const Step = Steps.Step;
const Option = Select.Option;

const getNewsDetailInfoUrl = restUrl.ADDR + 'News/getNewsDetail';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

class NewsDetailInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	data: {},
    	editorState: EditorState.createEmpty(),
    	loading: true
    };
  }

  componentDidMount = () => {
  	this.getProductDetailInfo();
  }

  //获取产品详情
  getProductDetailInfo = (id) => {
  	let param = {};
  	param.newsId = this.props.params.id;
  	ajax.getJSON(getNewsDetailInfoUrl, param, (data) => {
  		data =  data.backData;
  		data.news_content = JSON.parse(data.news_content);
  		data.contentHtml = draftToHtml(data.news_content);
  		console.log('contentHtml === ', data.contentHtml);
		this.setState({
			data,
			loading: false
		});
  	});
  }

  render() {
  	let { data, editorState, loading } = this.state;

    return (
      <div className="zui-cotent">
      	<div className="breadcrumb-block">
	    	<Breadcrumb>
	            <Breadcrumb.Item>首页</Breadcrumb.Item>
	            <Breadcrumb.Item>案例和新闻管理</Breadcrumb.Item>
	            <Breadcrumb.Item>新闻列表</Breadcrumb.Item>
	            <Breadcrumb.Item>新闻详情</Breadcrumb.Item>
	        </Breadcrumb>
	    </div>
      	<div className="ibox-title">
            <h5>新闻详情</h5>
        </div>
        <div className="ibox-content">
        	<Spin spinning={loading}>
		      	<Form>
		      		<Divider>新闻信息</Divider>
		      		<Row>
		      			<Col span={12}>
					        <FormItem
					            label="新闻标题"
					            {...formItemLayout}
					          >
					            <Input 
					            	disabled
					            	value={data.news_title} 
					            />
					        </FormItem>
					    </Col>
					    <Col span={12}>
					        <FormItem
					            label="新闻概要"
					            {...formItemLayout}
					          >
					            <Input 
					            	disabled
					            	value={data.news_brief} 
					            />
					        </FormItem>
					    </Col>
				    </Row>
				    <Divider>新闻内容</Divider>			
		      		<Row>
		      			<Col span={24}>
					        <div dangerouslySetInnerHTML={{__html: data.contentHtml}}></div>
		      			</Col>
		      		</Row>
		        </Form>
		    </Spin>
	    </div>
      </div>
    );
  }
}

export default NewsDetailInfo;
