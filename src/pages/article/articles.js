import React, { Component } from 'react';
import { Input, Icon, Modal, Button, Form } from 'antd';
import { connect } from "react-redux";

import { Http } from '../../utils/http';
import Table from './table';
import Tags from '../../components/tagsGroup';
import { tools } from '../../utils/tools';
import ArticleDetail from './articleDetail';
import './articles.css';
import {
  clear,
  editArticle
} from '../../actions/index';

const FormItem = Form.Item;
let newArticle = {};

class AddForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,

    }
  }
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
  handleCancel = () => {
    this.setState({ visible: false });
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
          <Tags initTags={this.props.initTags}/>
        </FormItem>
        <FormItem>
          <Button onClick={() => this.setState({ visible: true })}>添加内容</Button>
          <Modal
            width='90%'
            style={{top: 20}}
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

    Http.post(Http.url('article/update'), this.props.token, newArticle, (res) => {
      console.log('res: ', res)
      this.props.dispatch(clear());
      this.setState({ loading: false, visible: false });
    }, (err) => {
      console.log('err: ', err);
    })
  };
  handleCancel = () => {
    this.props.dispatch(clear());
    this.setState({ visible: false });
  };

  setData = () => {
    newArticle.tag = [...this.props.tags];
    newArticle.date = new Date().toISOString();
    newArticle.content = this.props.content;
    let list = [...this.state.articleList, newArticle].map((ele, index) => {
      ele.key = index;
      return ele;
    });
    console.log('list: ', list);
    this.setState({
      articleList: list
    });
  };

  editArticle(index, article){
    console.log(index, article)
    this.props.dispatch(editArticle(article))
    this.setState({
      visible: true
    })
  }

  render() {
    return (
      <div className="articles">
        <div>
          <Button type="primary" onClick={this.showModal}>
            add
          </Button>
          <Modal
            visible={this.state.visible}
            title="Title"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
          >
            <WrappedAddForm
              article={this.props.article}
              closeModal={() => this.handleCancel()}
              save={() => this.handleOk()} />
          </Modal>
        </div>
        <Table dataSource={this.state.articleList}
               initTags={this.props.tags}
               editArticle={(index, article) => this.editArticle(index, article)}/>
      </div>
    )
  }
}

function select(store) {
  return {
    token: store.admin.token,
    tags: store.article.tags,
    content: store.article.content
  }
}

export default connect(select)(Articles);
