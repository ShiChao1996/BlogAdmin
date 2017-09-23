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
          <a>编辑属性</a>
        </Menu.Item>
        <Menu.Item>
          <a>编辑文章</a>
        </Menu.Item>
        <Menu.Item>
          <a>删除</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} placement="edit">
        <Button>bottomRight</Button>
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
