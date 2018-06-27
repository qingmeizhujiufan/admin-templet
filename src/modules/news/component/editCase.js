import React from 'react';
import {
    Form,
    Row,
    Col,
    Breadcrumb,
    Icon,
    Input,
    Select,
    Divider,
    Button,
    Upload,
    notification,
    Steps,
    Spin
} from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../news.less';

import {EditorState, convertFromRaw, convertToRaw, ContentState} from 'draft-js';
import ZZEditor from '../../../components/zzEditor/zzEditor';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const FormItem = Form.Item;

const getCaseDetailInfoUrl = restUrl.ADDR + 'News/getCaseDetail';
const saveCaseUrl = restUrl.ADDR + 'News/saveAPCase';

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 12},
};

class EditNews extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            loading: true,
            submitLoading: false
        };
    }

    componentDidMount = () => {
        this.getCaseDetailInfo();
    }

    //获取案例详情
    getCaseDetailInfo = (id) => {
        let param = {};
        param.caseId = this.props.params.id;
        ajax.getJSON(getCaseDetailInfoUrl, param, (data) => {
            if (data.success) {
                data = data.backData;

                let detail_img = data.detail_img.split(',');
                let photoList = [];
                if (detail_img[0] !== '') {
                    detail_img.map((photo, index) => {
                        photoList.push({
                            uid: photo,
                            name: photo + '.png',
                            status: 'done',
                            url: restUrl.BASE_HOST + 'UpLoadFile/' + photo + '.png',
                            response: {
                                data: {
                                    id: photo
                                }
                            }
                        });
                    });
                }
                data.detail_img = photoList;

                this.setState({
                    data,
                    loading: false
                });
            }
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
                values.id = this.props.params.id;
                values.detail_img = values.detail_img.map(item => {
                    return item.response.data.id;
                }).join(',');
                console.log('handleSubmit  param === ', values);

                ajax.postJSON(saveCaseUrl, JSON.stringify(values), (data) => {
                    this.setState({
                        loading: false
                    });
                    notification.open({
                        message: '更新案例成功！',
                        icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
                    });
                    this.context.router.push('/frame/news/caseList');
                });
            }
        });
    }


    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    render() {
        let {data, editorState, loading, submitLoading} = this.state;
        const {getFieldDecorator, setFieldsValue} = this.props.form;

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
                                <Col span={12}>
                                    <FormItem
                                        label="案例名称"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('title', {
                                            rules: [{required: true, message: '案例名称不能为空!'}],
                                            initialValue: data.title
                                        })(
                                            <Input
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <FormItem
                                        label="新闻封面"
                                        labelCol={{span: 3}}
                                        wrapperCol={{span: 21}}
                                    >
                                        {getFieldDecorator('detail_img', {
                                            valuePropName: 'fileList',
                                            getValueFromEvent: this.normFile,
                                            rules: [{required: true, message: '封面图片不能为空!'}],
                                            initialValue: data.detail_img
                                        })(
                                            <Upload
                                                action={restUrl.UPLOAD}
                                                listType={'picture'}
                                                multiple={true}
                                                className='upload-list-inline'
                                            >
                                                <Button><Icon type="upload"/> 上传</Button>
                                            </Upload>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Divider></Divider>
                            <Row type="flex" justify="center">
                                <Col>
                                    <Button type="primary" loading={this.state.submitLoading} htmlType="submit">
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
    router: React.PropTypes.object
}

export default WrappedEditNews;
