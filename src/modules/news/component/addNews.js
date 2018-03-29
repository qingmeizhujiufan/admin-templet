import React from 'react';
import { Form, Row, Col, Icon, Input, InputNumber, Dropdown, Menu, Avatar, Select, Divider, Button, Upload, notification } from 'antd';
import ajax from 'Utils/ajax';
import '../news.less';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const FormItem = Form.Item;
const Option = Select.Option;

const getBrandGroupUrl = 'http://www.xuecheh.com/Product/getBrandList';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

class AddProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	price: 100,
    	loading: false,
    	editorState: EditorState.createEmpty(),
    };
  }

  componentDidMount = () => {
  }

  customRequest = (data, obj, fallback) => {
  	var file = data.file;
    console.log('file === ', file);
    if (1 > 0) {
        // loadingIn();
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            var img = new Image();
            img.src = this.result;
            var fileContent = this.result;

            img.onload = function () {
                // if (fileContent.length > maxSize)
                //     fileContent = compress(this);    //图片压缩

                fileContent = fileContent.substring(fileContent.indexOf(",") + 1);

                var params = {
                    fileName: file.name,
                    fileContent: fileContent,
                    fileSize: fileContent.length
                };

                ajax.postJSON('http://localhost:25007/AdminManage/UpLoadImage', params, function (data) {
                    if (data.success) {
                        var backData = data.backData;
                        console.log("imgbackData===", backData);
                        notification.open({
						    message: '上传成功！',
						    description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
						    icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
						});
                        if (fallback && typeof fallback == 'function')
                            fallback(img.src, backData);
                    } else {
                        alert(data.backMsg ? data.backMsg : "上传失败！");
                    }                
                })
            }
        }
    }
  }

  saveProduct = ()=> {
  	this.setState({
  		loading: true
  	});
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  }

  render() {
  	let { price, editorState } = this.state;

  	function uploadImageCallBack(file) {
  		console.log('uploadImageCallBack   file === ', file);
  		return new Promise(
		    (resolve, reject) => {
		        const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
		        xhr.open('POST', 'http://localhost:25007/AdminManage/UpLoadImage');
		        var reader = new FileReader();
		        reader.readAsDataURL(file);
		        reader.onload = function (e) {
		            var img = new Image();
		            img.src = this.result;
		            var fileContent = this.result;

		            img.onload = function () {
		                // if (fileContent.length > maxSize)
		                //     fileContent = compress(this);    //图片压缩

		                fileContent = fileContent.substring(fileContent.indexOf(",") + 1);

		                var params = {
		                    fileName: file.name,
		                    fileContent: fileContent,
		                    fileSize: fileContent.length
		                };

		                xhr.send(JSON.stringify(params));

		      //           ajax.postJSON('http://localhost:25007/AdminManage/UpLoadImage', params, function (data) {
		      //               if (data.success) {
		      //                   var backData = data.backData;
		      //                   console.log("imgbackData===", backData);
		      //                   notification.open({
								//     message: '上传成功！',
								//     description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
								//     icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
								// });
		      //                   if (fallback && typeof fallback == 'function')
		      //                       fallback(img.src, backData);
		      //               } else {
		      //                   alert(data.backMsg ? data.backMsg : "上传失败！");
		      //               }                
		      //           })
		            }
		        }
		      
		      xhr.addEventListener('load', () => {
		        const response = JSON.parse(xhr.responseText);
		        resolve(response);
		      });
		      xhr.addEventListener('error', () => {
		        const error = JSON.parse(xhr.responseText);
		        reject(error);
		      });
		    },
		 );
	}

    return (
      <div className="zui-cotent addNews">
      	<div className="ibox-title">
            <h5>添加新闻</h5>
        </div>
        <div className="ibox-content">
	      	<Form>
	      		<Divider>基本信息</Divider>
	      		<Row>
	      			<Col span={12}>
	      				<FormItem
				            label="封面上传"
				            {...formItemLayout}
				          >
				            <Upload
				            	action={'http://localhost:25007/AdminManage/UpLoadImage'}
							    listType={'picture'}
							    multiple={true}
							    className='upload-list-inline'
							    customRequest={(data) => {
							    	this.customRequest(data);
							    }}
				            >
						      <Button><Icon type="upload" /> 上传</Button>
						    </Upload>
				        </FormItem>	      	
	      			</Col>
	      		</Row>
	      		<Row>
	      			<Col span={12}>
				        <FormItem
				            label="产品名称"
				            {...formItemLayout}
				          >
				            <Input placeholder="" />
				        </FormItem>
				    </Col>
				    <Col span={12}>
				        <FormItem
				            label="产品类别"
				            {...formItemLayout}
				          >
				            <Input placeholder="" />
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
				            	value={price}
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
				            <Input placeholder="" />
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
						            uploadCallback: uploadImageCallBack,
						            alt: { present: true, mandatory: false },
						        },
						     }}
						/>
				    </Col>
			    </Row>
			    <Divider></Divider>
			    <Row type="flex" justify="center">
			    	<Col>
			    		<Button type="primary" loading={this.state.loading} onClick={this.saveProduct}>
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

export default AddProduct;
