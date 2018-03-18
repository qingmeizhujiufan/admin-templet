import React from 'react';
import { Table, Icon, Divider, Breadcrumb  } from 'antd';
import ajax from 'Utils/ajax';
import '../user.less';

const getUserListUrl = 'http://www.xuecheh.com/User/getUserList';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '性别',
  dataIndex: 'sex',
  key: 'sex',
}, {
  title: '住址',
  dataIndex: 'village',
  key: 'village',
}];

class UserList extends React.Component {
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
            <Breadcrumb.Item>人员管理</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ibox-title">
            <h5>所有用户</h5>
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

UserList.contextTypes = {  
  router: React.PropTypes.object  
} 

export default UserList;