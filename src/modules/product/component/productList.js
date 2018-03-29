import React from 'react';
import { Link } from 'react-router';
import { Table, Icon, Divider, Breadcrumb, Menu, Dropdown  } from 'antd';
import ajax from 'Utils/ajax';
import '../product.less';

const getUserListUrl = 'http://www.xuecheh.com/Product/getProductList';

const detailrouter = (id) => {
  return `/product/productDetailInfo/${id}`
}

const columns = [{
  title: '产品名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '类别',
  dataIndex: 'type',
  key: 'type',
}, {
  title: '品牌',
  children: [{
    title: '型材品牌',
    dataIndex: 'structuralSection',
    key: 'structuralSection',
  }, {
    title: '五金配件',
    dataIndex: 'hardware',
    key: 'hardware',
  }, {
    title: '密封胶品牌',
    dataIndex: 'sealant',
    key: 'sealant',
  }]
}, {
  title: '单价',
  dataIndex: 'price',
  key: 'price',
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
}, {
  title: '创建时间',
  dataIndex: 'create_time',
  key: 'create_time',
}, {
  title: <a><Icon type="setting" style={{fontSize: 18}} /></a>,
  key: 'operation',
  fixed: 'right',
  width: 100,
  render: (text, record, index) => (
    <Dropdown 
      overlay={<Menu>
                <Menu.Item>
                  <Link to={detailrouter(record.id)}>详情</Link>
                </Menu.Item>
                <Menu.Item>
                  <a>删除</a>
                </Menu.Item>
              </Menu>}
    >
      <a className="ant-dropdown-link" href="#">操作</a>
    </Dropdown>
  ),
}];

class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: []
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
        dataSource: data
      });
    });
  }

  render() {
    const { dataSource } = this.state;

    return (
      <div className="zui-content">
        <div className="breadcrumb-block">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>产品管理</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ibox-title">
            <h5>所有产品</h5>
        </div>
        <div className="ibox-content">
          <Table 
            bordered={true} 
            dataSource={dataSource} 
            columns={columns}
           />
          </div>
        </div>
    );
  }
}

ProductList.contextTypes = {  
  router: React.PropTypes.object  
} 

export default ProductList;