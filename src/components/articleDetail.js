/*
 * MIT License
 *
 * Copyright (c) 2017 SmartestEE Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Revision History:
 *     Initial: 2018/02/07        ShiChao
 */

import React, { Component } from 'react';
import {
  Spin,
  Card,
  Icon,
  Tag,
  Tooltip
} from 'antd';
import MarkDown from '../components/markdown';
import { connect } from "react-redux";
import moment from 'moment';
import { Http } from '../utils/http';
import { tools } from '../utils/tools';
import EditArticle from './editArticle';
import './articleDetail.css';

const colors = [ 'pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple' ];

class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      article: null,
      editMode: false,
    }
  }

  componentWillMount() {
    this.getData()
  }

  getData =() => {
    let data = {
      _id: this.props.location.search.slice(5)
    };
    Http.post(Http.url('article/getdetail'), "", data, (res) => {
      if (res.status === 0) {
        console.log('resp: ', res.resp);
        let md = res.resp.content;
        this.setState({
          article: res.resp,
          text: md.toString()
        })
      }
    }, (err) => console.log(err))
  };

  changeMode = (isEdit) => {
    this.setState({
      editMode: isEdit
    })
  };

  saveChange = () => {
    const edited = this.refs.editedArticle;
    edited.upload();
    this.changeMode(false);
  };

  cancel = () => {
    this.changeMode(false)
  };

  render() {
    return (
      <div className="detail-content">
        <div className="top-bar">
          {
            !this.state.editMode ?
              <Tooltip placement="top" title="编辑">
                <Icon type="edit" className="edit-btn" onClick={() => this.changeMode(true)}/>
              </Tooltip>
              :
              <div>
                <Tooltip placement="top" title="保存">
                  <Icon type="check-circle-o" className="edit-btn" onClick={this.saveChange}/>
                </Tooltip>
                < Tooltip placement="top" title="取消">
                  <Icon type="close-circle-o" className="edit-btn" onClick={this.cancel}/>
                </Tooltip>
              </div>
          }
        </div>

        {
          !this.state.editMode ?
            <Card style={{ width: '100%' }}>
              {
                this.state.article ? <ArticleInfo article={this.state.article}/> : null
              }
              <div style={styles.markdown}>
                {
                  this.state.text === "" ? <Spin size="large"/> : <MarkDown text={this.state.text}/>
                }
              </div>

            </Card>
            :
            <Card style={{ padding: '20px' }}>
              <EditArticle article={this.state.article} ref="editedArticle"/>
            </Card>
        }
      </div>
    )
  }
}

const styles = {
  markdown: {
    width: "100%",
  }
};

class ArticleInfo extends Component {
  render() {
    const { article } = this.props;
    //const image = article.image ? article.image.slice(15) : '';
    const image = article.image ? article.image.slice(28) : '';
    return (
      <div className="info">
        <h1 className="info-title">{article.title}</h1>
        <p className="info-date">{moment(article.date).format("LL")}</p>
        <div className="info-tags">
          {article.tags.map((tag, Index) => {
            return <Tag key={tools.generalKey()} className="tag"
                        color={colors[ tools.randomInt(0, colors.length - 1) ]}>{tag}</Tag>
          })}
        </div>
        {
          article.image ? <img src={Http.picUrl(image)} className="info-image"/> : null
        }
      </div>
    )
  }
}

function select(store) {
  return {
    article: store.article.article,
  }
}

export default connect(select)(ArticleDetail);