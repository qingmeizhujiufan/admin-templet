import React from 'react';
import {Link} from 'react-router';
import {Table, Icon, notification, Breadcrumb, Dropdown, Menu, Spin} from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../news.less';

const getCaseListUrl = restUrl.ADDR + 'News/getCaseList';
const delCaseUrl = restUrl.ADDR + 'News/delCase';

class CaseList extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (text, record, index) => (
                <Link to={this.detailrouter(record.id, 'edit')}>{text}</Link>
            )
        }, {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
        }, {
            title: <a><Icon type="setting" style={{fontSize: 18}}/></a>,
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (text, record, index) => <Dropdown
                overlay={<Menu>
                    <Menu.Item>
                        <Link to={this.detailrouter(record.id, 'edit')}>更新</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <a onClick={() => this.delNews(record.id)}>删除</a>
                    </Menu.Item>
                </Menu>}
            >
                <a className="ant-dropdown-link">操作</a>
            </Dropdown>,
        }];

        this.state = {
            dataSource: [],
            loading: true,
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        var param = {};
        ajax.getJSON(getCaseListUrl, null, (data) => {
            data = data.backData.content;
            data.map(function (item, index) {
                item.key = index;
            });
            this.setState({
                dataSource: data,
                loading: false
            });
        });
    }

    detailrouter = (id, type) => {
        if (type === 'show')
            return `/frame/news/caseDetailInfo/${id}`;
        else
            return `/frame/news/editCase/${id}`;
    }

    delNews = id => {
        let param = {};
        param.newsId = id;
        this.setState({
            loading: true
        });
        ajax.postJSON(delCaseUrl, JSON.stringify(param), (data) => {
            if(data.success){
                notification.open({
                    message: '删除案例成功！',
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
                });
                let {dataSource} = this.state;
                dataSource = dataSource.filter(item => item.id !== id);

                this.setState({
                    dataSource,
                    loading: false
                });
            }
        });
    }

    render() {
        const {dataSource, loading} = this.state;

        return (
            <div className="zui-content">
                <div className="breadcrumb-block">
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>案例和新闻管理</Breadcrumb.Item>
                        <Breadcrumb.Item>案例列表</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="ibox-title">
                    <h5>所有案例</h5>
                </div>
                <div className="ibox-content">
                    <Spin spinning={loading}>
                        <Table
                            bordered={true}
                            dataSource={dataSource}
                            columns={this.columns}
                        />
                    </Spin>
                </div>
            </div>
        );
    }
}

CaseList.contextTypes = {
    router: React.PropTypes.object
}

export default CaseList;