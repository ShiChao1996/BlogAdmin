import React, { Component } from 'react';
import { Input, Icon, Modal, Button, Form } from 'antd';
import { connect } from "react-redux";

import { Http } from '../../utils/http';
import Table from './table';
import Tags from '../../components/tagsGroup';
import { tools } from '../../utils/tools';
import './articles.css';

const FormItem = Form.Item;
let newArticle = {};

class AddForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        newArticle = tools.copyAttr(newArticle, values, true);
        this.props.save();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('title', {
            rules: [ { required: true, message: 'Please input title!' } ],
          })(
            <Input prefix={<Icon type="bars" style={{ fontSize: 14 }}/>} placeholder="title"/>
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('desc', {
            rules: [ { required: true, message: 'Please input description!' } ],
          })(
            <Input prefix={<Icon type="file-text" style={{ fontSize: 14 }}/>} type="text" placeholder="description"/>
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', {
            rules: [ { required: true, message: 'Please input your Password!' } ],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 14 }}/>} type="text" placeholder="Password"/>
          )}
        </FormItem>

        <FormItem>
          <Tags/>
        </FormItem>
        <FormItem>
          <Button key="back" size="large" onClick={() => this.props.closeModal()}>Return</Button>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Submit
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedAddForm = Form.create()(AddForm);


class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleList: [],
      loading: false,
      visible: false,
    }
  }

  componentWillMount() {
    const token = this.props.token;
    console.log('token: ', token);
    Http.get(Http.url('article/getlist'), token, (res) => {
      if (res.status === 0 && res.resp) {
        console.log(res)
        let data = res.resp.map((ele, index) => {
          ele.key = index;
          return ele;
        });
        console.log(data)
        this.setState({
          articleList: data
        })
      }
    }, function (err) {
      console.log(err)
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({ loading: true });
    this.setData();
    this.setState({ loading: false, visible: false });

    /*setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 2000);*/
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }

  setData = () => {
    newArticle.tag = [...this.props.tags];
    newArticle.date = new Date().toISOString();
    let list = [...this.state.articleList, newArticle].map((ele, index) => {
      ele.key = index;
      return ele;
    });
    console.log('list: ', list)
    this.setState({
      articleList: list
    })
  }

  render() {
    return (
      <div className="articles">
        <div>
          <Button type="primary" onClick={this.showModal}>
            Open
          </Button>
          <Modal
            visible={this.state.visible}
            title="Title"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
          >
            <WrappedAddForm closeModal={() => this.handleCancel()} save={() => this.handleOk()} />
          </Modal>
        </div>
        <Table dataSource={this.state.articleList}/>
      </div>
    )
  }
}

function select(store) {
  return {
    token: store.admin.token,
    tags: store.article.tags
  }
}

export default connect(select)(Articles);
