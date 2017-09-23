import React, { Component } from 'react';
import { Table, Icon, Menu, Dropdown, Button, Tag } from 'antd';

const colors = ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple']

const columns = [ {
  title: 'Title',
  dataIndex: 'title',
  key: 'title',
}, {
  title: 'tags',
  dataIndex: 'tag',
  key: 'tag',
  render: (tags) => {
    return tags.map((tag, index) => {
      return <Tag key={index} color={colors[index]}>{tag}</Tag>
    })
  }
}, {
  title: 'date',
  dataIndex: 'date',
  key: 'date',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => {
    const menu = (
      <Menu>
        <Menu.Item>
          <Button>编辑属性</Button>
        </Menu.Item>
        <Menu.Item>
          <Button>编辑文章</Button>
        </Menu.Item>
        <Menu.Item>
          <Button>删除</Button>
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} placement="bottomRight">
        <Button>edit</Button>
      </Dropdown>
    )
  },
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
