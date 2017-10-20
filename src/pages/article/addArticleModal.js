import React, { Component } from 'react';
import { Input, Icon, Modal, Button, Form } from 'antd';
import { connect } from "react-redux";

import Tags from '../../components/tagsGroup';
import { tools } from '../../utils/tools';
import ArticleDetail from './articleDetail';
import Uploader from '../../components/uploader';
import './articles.css';
import {
  clear,
  editArticle,
  setImg
} from '../../actions/index';
import './addArticleModal.css';

const FormItem = Form.Item;

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      title: this.props.article.title,
      article: this.props.article
    }
  }

  componentWillReceiveProps(props) {
    console.log('thsi.is props received: ', props.article)
    this.setState({
      article: props.article,
      title: props.article.title
    })
  }

  handleImg = (imgUrl) => {
    this.props.dispatch(setImg(imgUrl));
  }

  handleSubmit = () => {
        this.props.dispatch(editArticle({ title: this.state.title }));
        this.props.save();
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }

  render() {
    return (
      <Form className="login-form">
        <FormItem>
          <Input value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })}
            prefix={<Icon type="bars" style={{ fontSize: 14 }}/>} placeholder="title"/>
        </FormItem>

        <FormItem>
          <Tags/>
        </FormItem>
        <FormItem>
          <Button onClick={() => this.setState({ visible: true })}>{this.state.article.content ? '修改内容' : '添加内容'}</Button>
          {!this.state.article.content ? null : <Icon className='checkIcon' type="check-circle" />}
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
          <Uploader initImg={this.state.article.img} handleImg={this.handleImg} />
        </FormItem>
        <FormItem>
          <Button key="back" size="large" onClick={() => this.props.closeModal()}>Return</Button>
          <Button type="primary" className="login-form-button" onClick={() => this.handleSubmit()}>
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
