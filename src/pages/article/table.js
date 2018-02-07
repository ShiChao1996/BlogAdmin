import React, { Component } from 'react';
import { Table, Icon, Menu, Dropdown, Button, Tag } from 'antd';
import moment from 'moment';

const colors = [ 'pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple' ]

export default class articleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      filterTags: []
    }

    this.pagination = {
      onChange: () => console.log('dfdf'),
      total: 10,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      dataSource: props.dataSource
    })
  }

  componentWillMount() {
    let newFilterTags = this.props.filterTags.map(tag => {
      return {
        text: tag,
        value: tag,
      }
    });
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
          return <Tag key={index} color={colors[ index ]}>{tag}</Tag>
        })
      },
      filters: newFilterTags,
      filterMultiple: false,
      onFilter: (value, record) => record.tags.includes(value),
    }, {
      title: 'date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => {
        return <span><Icon type="calendar"/>{moment(date).format("LLLL") || moment().format("LLLL")}</span>
      },
      sorter: (a, b) => {
        let data1 = new Date(a.date).getTime();
        let data2 = new Date(b.date).getTime();
        return data1 - data2;
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

  edit(text, record) {
    this.props.editArticle && this.props.editArticle(text, record);
  }

  remove(text, record) {
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
