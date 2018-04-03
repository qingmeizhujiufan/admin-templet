import React from 'react';
import { Link } from 'react-router';
import { Table, Icon, Divider, Breadcrumb, Menu, Dropdown, Spin  } from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../order.less';

const getUserListUrl = restUrl.ADDR + 'Order/getOrderList';


class OrderList extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [{
      title: '订单编号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      fixed: 'left',
      width: 200,
      render: (text, record, index) => (
          <Link to={this.detailrouter(record.id)}>{text}</Link>
      )
    }, {
      title: '预订人',
      dataIndex: 'userName',
      key: 'userName',
    }, {
      title: '预订电话',
      dataIndex: 'telephone',
      key: 'telephone',
    }, {
      title: '预订地址',
      dataIndex: 'address',
      key: 'address',
      render: (text, record, index) => (
          <div>{record.province + record.city + record.county + record.area}</div>
      )
    }, {
      title: '安装时间',
      dataIndex: 'installDate',
      key: 'installDate',
    }, {
      title: '支付金额',
      dataIndex: 'payMoney',
      key: 'payMoney',
    }, {
      title: '订单状态',
      dataIndex: 'state',
      key: 'state',
    }, {
      title: <a><Icon type="setting" style={{fontSize: 18}} /></a>,
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: () => <Dropdown 
          overlay={<Menu>
        <Menu.Item>
          <a>详情</a>
        </Menu.Item>
        <Menu.Item>
          <a>完成订单</a>
        </Menu.Item>
      </Menu>}
        >
          <a className="ant-dropdown-link">操作</a>
        </Dropdown>,
    }];

    this.state = {
      dataSource: [],
      loading: true
    };
  }

  componentWillMount = () => { 
  }

  componentDidMount = () => { 
    var param = {};
    ajax.getJSON(getUserListUrl, null, (data) => {
      data =  eval('(' + data.backData + ')');
      console.log('UserList === ', data);
      data.map(function(item, index){
        item.key = index;
      });
      this.setState({
        dataSource: data,
        loading: false
      });
    });
  }

  detailrouter = (id) => {
    return `/frame/order/orderDetailInfo/${id}`
  }

  render() {
    const { dataSource, loading } = this.state;

    return (
      <div className="zui-content">
        <div className="breadcrumb-block">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>产品管理</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ibox-title">
            <h5>所有订单</h5>
        </div>
        <div className="ibox-content">
          <Spin spinning={loading}>
            <Table 
              bordered={true} 
              dataSource={dataSource} 
              columns={this.columns}
              scroll={{ x: 1500 }}
             />
          </Spin>
        </div>
      </div>
    );
  }
}

OrderList.contextTypes = {  
  router: React.PropTypes.object  
} 

export default OrderList;