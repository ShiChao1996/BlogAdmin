import React, { Component } from 'react';
import { Table, Icon, Menu, Dropdown, Button } from 'antd';

const columns = [ {
  title: 'Title',
  dataIndex: 'title',
  key: 'title',
}, {
  title: 'tag',
  dataIndex: 'tag',
  key: 'age',
}, {
  title: 'comments',
  dataIndex: 'comments',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => {
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">编辑属性</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">编辑文章</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">删除</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} placement="bottomRight">
        <Button>bottomRight</Button>
      </Dropdown>
    )
  },
} ];

const data = [ {
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
} ];

export default class articleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      dataSource: props.dataSource
    })
  }

  render() {
    return (
      <Table columns={columns} dataSource={this.state.dataSource}/>
    )
  }
}
