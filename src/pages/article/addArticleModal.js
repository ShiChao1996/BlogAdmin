import React, { Component } from 'react';
import { Input, Icon, Modal, Button, Form } from 'antd';
import { connect } from "react-redux";

import Tags from '../../components/tagsGroup';
import { tools } from '../../utils/tools';
import ArticleDetail from './articleDetail';
import './articles.css';
import {
  clear,
  editArticle
} from '../../actions/index';

const FormItem = Form.Item;

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      defaultTitle: ''
    }
  }

  componentWillReceiveProps(props){
    console.log('receiveddddd: ',props.article)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch(editArticle(values));
        this.props.save();
      }
    });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    console.log()
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('title', {
            rules: [ { required: true, message: 'Please input title!' } ],
            initialValue: this.props.article.title
          })(
            <Input prefix={<Icon type="bars" style={{ fontSize: 14 }}/>} placeholder="title"/>
          )}
        </FormItem>

        <FormItem>
          <Tags defaultTags={this.props.article.tags}/>
        </FormItem>
        <FormItem>
          <Button onClick={() => this.setState({ visible: true })}>添加内容</Button>
          <Modal
            width='90%'
            style={{ top: 20 }}
            visible={this.state.visible}
            title="Title"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
          >
            <ArticleDetail closeModal={() => this.setState({ visible: false })}/>
          </Modal>
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

function select(store) {
  return {
    token: store.admin.token,
    article: store.article.article
  }
}

export default connect(select)(WrappedAddForm);
