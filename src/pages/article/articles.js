import React, {Component} from 'react';
import { Input, Popconfirm, Modal } from 'antd';
import {connect} from "react-redux";

import {Http} from '../../utils/http';
import Table from './table';
import './articles.css';

class Articles extends Component{
  constructor(props){
    super(props);
    this.state = {
      articleList: [],
    }
  }

  componentWillMount(){
    const token =  this.props.token;
    console.log('token: ', token);
    Http.get(Http.url('article/getlist'), token, (res) => {
      if(res.status === 0){
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

  render(){
    return(
      <div className="articles">
        <Button type='default' onclick={}>add</Button>
        <Table dataSource={this.state.articleList} />
      </div>
    )
  }

  handleAdd(){

  }
}

function select(store) {
  return {
    token: store.admin.token
  }
}

export default connect(select)(Articles);
