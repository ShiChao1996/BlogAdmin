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
 *     Initial: 2018/03/17        ShiChao
 */

import React, { Component } from 'react';
import {
  Card,
  Button,
} from 'antd';

import { Http } from '../../utils/http';
import Upload from './fileUpload';
import "./file.css";

export default class Files extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      add: false,
    }
  }

  componentWillMount() {
    Http.get(Http.url("image/list"), "", (res) => {
      if (res.status === 0) {
        this.setState({
          images: res.resp,
        });
        console.log(res.resp)
      }
    }, (err) => console.log(err))
  }

  handleAdd = () => {
    this.setState({
      add: !this.state.add
    })
  };

  render() {
    return (
      <Card className="file-container">
        <Button onClick={this.handleAdd}>{
          this.state.add ? "OK" : "添加"
        }</Button>
        {
          this.state.add ? <Upload/> :
            this.state.images.length === 0 ? null : this.state.images.map(image => {
              return <img key={image} src={image} className="img"/>
            })
        }
      </Card>
    )
  }
}
