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

const openNotification = (note) => {
  notification.open({
    message: 'Notification',
    description: note,
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
    this.isEditMode = false;
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
      return;
    }
    this.setData();
    this.setState({ visible: false });

    Http.post(Http.url('article/upsert'), this.props.token, this.props.article, (res) => {
      if(res.status === 0){ openNotification('operation success!') }
      this.setState({ loading: false, visible: false });
      this.props.dispatch(clear());
    }, (err) => {
      console.log('err: ', err);
    })
  };
  handleCancel = () => {
    this.props.dispatch(clear());
    this.setState({ visible: false });
  };

  setData = () => {
    let exist = false;
    let newList = this.state.articleList.map(ele => {
      if(ele._id === this.props.article._id){
        exist = true;
        return this.props.article;
      }
      return ele;
    });
    if(!exist){
      newList = [ ...this.state.articleList, this.props.article ].map((ele, index) => {
        ele.key = index;
        return ele;
      });
    }

    this.setState({
      articleList: newList
    });
  };

  editArticle(index, article) {
    this.props.dispatch(clear());
    this.props.dispatch(editArticle(article));
    this.setState({
      visible: true
    })
  }

  removeArticle(index, article) {
    this.props.dispatch(clear());
    Http.post(Http.url('article/remove'), this.props.token, { id: article._id }, (res) => {
      console.log('res: ', res);
      openNotification('operation success!');
    }, (err) => {
      console.log('err: ', err);
    })
    let list = this.state.articleList.filter(_ => _._id !== article._id);
    this.setState({
      articleList: list
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
               removeArticle={(index, article) => this.removeArticle(index, article)}
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
