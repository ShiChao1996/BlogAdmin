import React, { Component } from 'react';
import { connect } from "react-redux";
import { Http } from '../utils/http';
import './listItem.css'
import ListItem from './listItem';
import Cache from '../cache/cache';

const articlelist = "articleList";

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
    if(Cache.exist(articlelist)){
      this.setState({
        list: Cache.getCache(articlelist)
      });
      return;
    }
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
        Cache.saveList(articlelist, data);
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
      <div>
        {this.state.list.map((line, index) => {
            return (
              <ListItem key={index} article={line}/>
            )
          }
        )}
      </div>
    )
  }
}

function select(store) {
  return {
    token: store.admin.token,
    tags: store.tags.tags
  }
}

export default connect(select)(List);
