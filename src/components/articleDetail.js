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
  Card
} from 'antd';
import MarkDown from '../components/markdown';
//import './articleDetail.css';
import { Http } from '../utils/http';

export default class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  componentWillMount() {
    let data = {
      _id: this.props.location.search.slice(5)
    };
    Http.post(Http.url('article/getcontent'),"", data, (res) => {
      console.log("res: ",res)
      if (res.status === 0) {
        let md = res.resp.content;
        this.setState({
          text: md.toString()
        })
      }
    }, (err) => console.log(err))
  }

  render() {
    return (
      <div className='article-content'>
        <Card>
          {
            this.state.text === "" ? <Spin size="large"/> : <MarkDown text={this.state.text}/>
          }
        </Card>
      </div>
    )
  }
}

