import React from 'react';
import {
    Form,
    Row,
    Col,
    Icon,
    Input,
    Divider,
    Button,
    Upload,
    notification
} from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../news.less';

const FormItem = Form.Item;

const saveCaseUrl = restUrl.ADDR + 'News/saveAPCase';

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 12},
};

class AddCase extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
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

                values.detail_img = values.detail_img.map((item, index) => {
                    return item.response.data.id;
                }).join(',');
                console.log('handleSubmit  param === ', values);
                ajax.postJSON(saveCaseUrl, JSON.stringify(values), (data) => {
                    this.setState({
                        loading: false
                    });
                    notification.open({
                        message: '新增案例成功！',
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
        const {getFieldDecorator} = this.props.form;

        return (
            <div className="zui-cotent addNews">
                <div className="ibox-title">
                    <h5>添加案例</h5>
                </div>
                <div className="ibox-content">
                    <Form onSubmit={this.handleSubmit}>
                        <Divider>基本信息</Divider>
                        <Row>
                            <Col span={12}>
                                <FormItem
                                    label="案例标题"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('title', {
                                        rules: [{required: true, message: '案例标题不能为空!'}]
                                    })(
                                        <Input placeholder=""/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem
                                    label="详情图片"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('detail_img', {
                                        valuePropName: 'fileList',
                                        getValueFromEvent: this.normFile
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
                                <Button type="primary" loading={this.state.loading} htmlType="submit">
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

const WrappedAddCase = Form.create()(AddCase);
AddCase.contextTypes = {
    router: React.PropTypes.object
}

export default WrappedAddCase;
