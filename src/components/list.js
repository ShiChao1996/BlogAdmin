import React, { Component } from 'react';
import {
  Card
} from 'antd';
import QueueAnim from 'rc-queue-anim';
import { connect } from "react-redux";
import { Http } from '../utils/http';
import './listItem.css'
import ListItem from './listItem';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      filter: "",
      totalLength: 0,
      loading: false
    }
  }

  componentWillMount() {
    const token = this.props.token;
    console.log('token: ', token);
    Http.post(Http.url('article/getslice'), token, { index: 0 }, (res) => {
      if (res.status === 0 && res.resp) {
        console.log(res);
        this.setState({
          totalLength: res.resp.length
        });
        let data = res.resp.list.map((ele, index) => {
          ele.key = index;
          return ele;
        });
        this.setState({
          list: data,
          loading: false
        })
      }
    }, (err) => {
      this.setState({
        loading: false
      });
      console.log(err)
    });
  }

  render() {
    return (
      <QueueAnim delay={1000} interval={300}>
        {this.state.list.map((line, index) => {
            return (
              <ListItem key={index} article={line}/>
            )
          }
        )}
      </QueueAnim>
    )
  }
}

function select(store) {
  return {
    token: store.admin.token,
    //article: store.article.article,
    tags: store.tags.tags
  }
}

export default connect(select)(List);
