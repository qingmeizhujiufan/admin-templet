import React from 'react';
import { Form, Row, Col, Icon, Input, InputNumber, Dropdown, Menu, Avatar, Select, Divider, Button, Upload, notification } from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../news.less';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const FormItem = Form.Item;
const Option = Select.Option;

const saveNewsUrl = restUrl.ADDR + 'News/saveAPNews';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

class AddNews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	loading: false,
    	fileList: [],
    	editorState: EditorState.createEmpty(),
    };
  }

  componentDidMount = () => {
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
		        message: '新增新闻成功！',
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
  	let { editorState, fileList } = this.state;
  	const { getFieldDecorator, setFieldsValue } = this.props.form;

    return (
      <div className="zui-cotent addNews">
      	<div className="ibox-title">
            <h5>添加新闻</h5>
        </div>
        <div className="ibox-content">
	      	<Form onSubmit={this.handleSubmit}>
	      		<Divider>基本信息</Divider>
	      		<Row>
	      			<Col span={12}>
	      				<FormItem
				            label="新闻封面上传"
				            {...formItemLayout}
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
				            label="新闻名称"
				            {...formItemLayout}
				        >
				        	{getFieldDecorator('news_title', {
			                    rules: [{ required: true, message: '新闻名称不能为空!' }]
			                })(
				            	<Input placeholder="" />
				            )}
				        </FormItem>
				    </Col>
				    <Col span={12}>
				        <FormItem
				            label="新闻类别"
				            {...formItemLayout}
				        >
				        	{getFieldDecorator('news_brief', {
			                    rules: [{ required: true, message: '新闻简介不能为空!' }]
			                })(
				            	<Input placeholder="" />
				            )}
				        </FormItem>
				    </Col>
			    </Row>
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
			    		<Button type="primary" loading={this.state.loading}  htmlType="submit">
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

const WrappedAddNews = Form.create()(AddNews);
AddNews.contextTypes = {  
     router:React.PropTypes.object  
} 

export default WrappedAddNews;
