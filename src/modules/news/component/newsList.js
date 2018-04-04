import React from 'react';
import { Link } from 'react-router';
import { Table, Icon, Divider, Breadcrumb, Dropdown, Menu, Spin  } from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../news.less';

const getNewsListUrl = restUrl.ADDR + 'News/getNewsList';

class NewsList extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [{
      title: '标题',
      dataIndex: 'news_title',
      key: 'news_title',
      render: (text, record, index) => (
          <Link to={this.detailrouter(record.id, 'show')}>{text}</Link>
      )
    }, {
      title: '概要',
      dataIndex: 'news_brief',
      key: 'news_brief',
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    }, {
      title: <a><Icon type="setting" style={{fontSize: 18}} /></a>,
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (text, record, index) => <Dropdown 
          overlay={<Menu>
        <Menu.Item>
          <Link to={this.detailrouter(record.id, 'show')}>详情</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={this.detailrouter(record.id, 'edit')}>更新</Link>
        </Menu.Item>
        <Menu.Item>
          <a>删除</a>
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
    ajax.getJSON(getNewsListUrl, null, (data) => {
      data =  data.backData.content;
      data.map(function(item, index){
        item.key = index;
      });
      this.setState({
        dataSource: data,
        loading: false
      });
    });
  }

  detailrouter = (id, type) => {
    if(type === 'show')
      return `/frame/news/newsDetailInfo/${id}`;
    else
      return `/frame/news/editNews/${id}`;
  }

  render() {
    const { dataSource, loading } = this.state;

    return (
      <div className="zui-content">
        <div className="breadcrumb-block">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>案例和新闻管理</Breadcrumb.Item>
            <Breadcrumb.Item>新闻列表</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ibox-title">
            <h5>所有新闻</h5>
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

NewsList.contextTypes = {  
  router: React.PropTypes.object  
} 

export default NewsList;