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
  Input,
  Row,
  Col,
  Icon,
  notification
} from 'antd';
import Tags from './tags';
import Uploader from './uploader';
import { Http } from '../utils/http';

const openNotification = (title) => {
  notification.open({
    message: 'Notification',
    description: title,
    icon: <Icon type="smile-circle" style={{ color: '#108ee9' }}/>,
  });
};

export default class EditArticle extends Component {
  constructor(props) {
    super(props);
    const { content, title } = props.article;
    this.state = {};
    this.article = {};
    this.content = content;
    this.title = title;
  }

  upload() {
    this.article._id = this.props.article ? this.props.article._id : "";
    this.article.content = this.content;
    this.article.image = this.refs.image.state.fileList[0] ? this.refs.image.state.fileList[0].thumbUrl : "";
    this.article.tags = this.refs.tags.state.tags;
    this.article.title = this.title;

    Http.post(Http.url('article/upsert'), this.props.token, this.article, (res) => {
      if (res.status === 0) {
        openNotification('operation success!');
        console.log("success")
      }
    }, (err) => {
      console.log('err: ', err);
      openNotification('operation failed!');
    })
  }

  setImage = (url) => {
    this.image = url;
  };

  setContent(content) {
    this.content = content
  }

  setTitle(title) {
    this.title = title;
  }

  render() {
    const { article } = this.props;
    return (
      <div className="edit-content">
        <Row style={{ marginBottom: 10 }}>
          <Col span={2}>
            <span style={{ fontSize: 16, textAlign: 'center' }}>title:</span>
          </Col>
          <Col span={18}>
            <Input defaultValue={article.title} onChange={(e) => this.setTitle(e.target.value)} ref="title"/>
          </Col>
        </Row>
        <Tags tags={article.tags} ref="tags"/>

        <Uploader initImg={article.image} ref="image"
                  handleImg={(url) => this.setImage(url)} style={{ marginTop: 10 }}/>

        <Input type="textarea" rows={30} ref="content"
               defaultValue={article.content}
               onChange={(e) => this.setContent(e.target.value)}/>
      </div>
    )
  }
}