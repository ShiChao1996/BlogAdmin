import React, { Component } from 'react';
import { Table, Icon, Menu, Dropdown, Button, Tag } from 'antd';

const colors = ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple']

export default class articleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    }

    this.pagination = {
      onChange: ()=>console.log('dfdf'),
      total: 10,
    }

    this.columns = [ {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: 'tags',
      dataIndex: 'tags',
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
      render: (date) => {
        return <span><Icon type="calendar" />{date || new Date().toISOString()}</span>
      }
    }, {
      title: 'Action',
      dataIndex: 'key',
      key: 'action',
      render: (text, record) => {
        const menu = (
          <Menu>
            <Menu.Item>
              <Button onClick={() => this.edit(text, record)}>编辑</Button>
            </Menu.Item>
            <Menu.Item>
              <Button onClick={() => this.remove(text, record)}>删除</Button>
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
  }

  componentWillReceiveProps(props) {
    this.setState({
      dataSource: props.dataSource
    })
  }

  edit(text, record){
    this.props.editArticle && this.props.editArticle(text, record);
  }

  remove(text, record){
    this.props.removeArticle && this.props.removeArticle(text, record);
  }

  render() {
    return (
      <Table
        columns={this.columns}
        dataSource={this.state.dataSource}
        pagination={false}
      />
    )
  }
}
