import React, { Component } from 'react';
import { Modal, Button, notification, Icon } from 'antd';
import { connect } from "react-redux";

import { Http } from '../../utils/http';
import Table from './table';
import './articles.css';
import {
  clear,
  editArticle
} from '../../actions/index';
import WrappedAddForm from './addArticleModal';

const openNotification = () => {
  notification.open({
    message: 'Notification Title',
    description: 'This is the content of the notification. This is the content of the notification.',
    icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
  });
};

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
    if (this.props.article.tags.length === 0) {
      openNotification();
      return;
    }
    this.setState({ loading: true });
    this.setData();
    this.setState({ loading: false, visible: false });

    Http.post(Http.url('article/upsert'), this.props.token, this.props.article, (res) => {
      console.log('res: ', res);
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
    let newArticle = {};
    newArticle.date = new Date().toISOString();
    this.props.dispatch(editArticle(newArticle));
    let list = [ ...this.state.articleList, this.props.article ].map((ele, index) => {
      ele.key = index;
      return ele;
    });
    this.setState({
      articleList: list
    });
  };

  editArticle(index, article) {
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
              save={() => this.handleOk()}/>
          </Modal>
        </div>
        <Table dataSource={this.state.articleList}
               initTags={this.props.article.tags}
               editArticle={(index, article) => this.editArticle(index, article)}/>
      </div>
    )
  }
}

function select(store) {
  return {
    token: store.admin.token,
    article: store.article.article
  }
}

export default connect(select)(Articles);
