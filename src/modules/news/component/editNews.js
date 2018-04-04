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
const saveNewsUrl = restUrl.ADDR + 'News/saveAPNews';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

class EditNews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	data: {},
    	editorState: EditorState.createEmpty(),
    	fileList: [],
    	loading: true,
    	submitLoading: false
    };
  }

  componentDidMount = () => {
  	this.getNewsDetailInfo();
  }

  //获取产品详情
  getNewsDetailInfo = (id) => {
  	let param = {};
  	param.newsId = this.props.params.id;
  	ajax.getJSON(getNewsDetailInfoUrl, param, (data) => {
  		data =  data.backData;
  		data.news_content = draftToHtml(JSON.parse(data.news_content));
  		console.log('data.news_content === ', data.news_content);
    	const contentBlock = htmlToDraft(data.news_content);
    	const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      	const editorState = EditorState.createWithContent(contentState);

      	const fileList = [{
			uid: -1,
			name: data.news_cover + '.png',
			status: 'done',
			url: restUrl.ADDR + 'UpLoadFile/' + data.news_cover + '.png'
	    }];

		this.setState({
			data,
			editorState,
			loading: false
		});
  	});
  }

    handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	        this.setState({
		  		loading: true
		  	});
	        let param = {};
	        param.id = this.props.params.id;
	        param.news_title = values.news_title;
	        param.news_brief = values.news_brief;
	        param.news_content = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
	        param.news_cover = values.news_cover ? (values.news_cover.fileList.map((item, index) => {
	        	return item.response.data.id;
	        }).join(',')) : null;
	        console.log('handleSubmit  param === ', param);
	        
	        ajax.postJSON(saveNewsUrl, JSON.stringify(param), (data) => {
	        	this.setState({
			  		loading: false
			  	});
	        	notification.open({
			        message: '更新新闻成功！',
			        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
			    });
			    this.context.router.push('/frame/news/newsList');
	        });
	      }
	    });
    }

  onEditorStateChange = (editorState) => {
		console.log(' editorState  getCurrentContent===  ', editorState.getCurrentContent());
		this.setState({
		  editorState,
		});
	}

	uploadImageCallBack = (file) => {
		console.log('uploadImageCallBack   file === ', file);
		return new Promise(
		    (resolve, reject) => {
		        const xhr = new XMLHttpRequest();
		        xhr.open('POST', restUrl.UPLOAD);
		        const data = new FormData();
	  			data.append('file', file);
		        xhr.send(data);
		      
			    xhr.addEventListener('load', () => {
			        const response = JSON.parse(xhr.responseText);
			        response.data.link = restUrl.ADDR + response.data.link;
			        console.log('response == ', response);
			        resolve(response);
			    });
			    xhr.addEventListener('error', () => {
			        const error = JSON.parse(xhr.responseText);
			        reject(error);
			    });
		    },
		);
	}

	handleChange = ({ fileList }) => this.setState({ fileList })

  render() {
  	let { data, editorState, fileList, loading, submitLoading } = this.state;
  	const { getFieldDecorator, setFieldsValue } = this.props.form;

    return (
      <div className="zui-cotent">
      	<div className="breadcrumb-block">
	    	<Breadcrumb>
	            <Breadcrumb.Item>首页</Breadcrumb.Item>
	            <Breadcrumb.Item>案例和新闻管理</Breadcrumb.Item>
	            <Breadcrumb.Item>新闻列表</Breadcrumb.Item>
	            <Breadcrumb.Item>更新新闻</Breadcrumb.Item>
	        </Breadcrumb>
	    </div>
      	<div className="ibox-title">
            <h5>更新新闻</h5>
        </div>
        <div className="ibox-content">
        	<Spin spinning={loading}>
		      	<Form onSubmit={this.handleSubmit}>
		      		<Divider>新闻信息</Divider>
		      		<Row>
		      			<Col span={24}>
		      				<FormItem
					            label="新闻封面"
					            labelCol={{span: 3}}
					            wrapperCol={{span: 21}}
					        >
					        	{getFieldDecorator('news_cover', {
				                    rules: [{ required: true, message: '封面图片不能为空!' }]
				                })(
						            <Upload
						            	action={restUrl.UPLOAD}
									    listType={'picture'}
									    multiple={false}
									    className='upload-list-inline'
									    onChange={this.handleChange}
						            >
								    	{fileList.length >= 1 ? null : <Button><Icon type="upload" /> 上传</Button>}
								    </Upload>
								)}
					        </FormItem>	      	
		      			</Col>
		      		</Row>
		      		<Row>
		      			<Col span={12}>
					        <FormItem
					            label="新闻标题"
					            {...formItemLayout}
					        >
					        	{getFieldDecorator('news_title', {
				                    rules: [{ required: true, message: '新闻名称不能为空!' }],
				                    initialValue: data.news_title
				                })(
						            <Input
						            />
						        )}
					        </FormItem>
					    </Col>
					    <Col span={12}>
					        <FormItem
					            label="新闻概要"
					            {...formItemLayout}
					        >
					        	{getFieldDecorator('news_brief', {
				                    rules: [{ required: true, message: '新闻概要不能为空!' }],
				                    initialValue: data.news_brief
				                })(
						            <Input 
						            />
						        )}
					        </FormItem>
					    </Col>
				    </Row>
				    <Divider>新闻内容</Divider>				
		      		<Row>
		      			<Col span={24}>
		      				<Editor
		      					localization={{ locale: 'zh' }}
	  							wrapperClassName="wysiwyg-wrapper"
					    		editorState={editorState}
	        					onEditorStateChange={this.onEditorStateChange}
	        					toolbar={{
							        image: {
							        	previewImage: true,
							            uploadCallback: this.uploadImageCallBack,
							            alt: { present: true, mandatory: false },
							        },
							    }}
					        />
		      			</Col>
		      		</Row>
		      		<Divider></Divider>
				    <Row type="flex" justify="center">
				    	<Col>
				    		<Button type="primary" loading={this.state.submitLoading}  htmlType="submit">
					          确认更新
					        </Button>
				    	</Col>
				    </Row>
		        </Form>
		    </Spin>
	    </div>
      </div>
    );
  }
}

const WrappedEditNews = Form.create()(EditNews);
EditNews.contextTypes = {  
     router:React.PropTypes.object  
} 

export default WrappedEditNews;
