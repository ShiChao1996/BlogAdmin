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
  Card,
  Tag
} from 'antd';
import { tools } from '../utils/tools';
import { Http } from '../utils/http';
import moment from 'moment';
import {
  Route,
  Link,
} from 'react-router-dom';
import './listItem.css';
import { connect } from "react-redux";
import {
  editArticle
} from '../actions/index';

const colors = [ 'pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple' ];

class ArticleListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { article, dispatch } = this.props;
    const image = article.image ? article.image.slice(15) : '';
    return (
      <div className="listItem" data-aos="fade-up">
        <p className="date">{moment(article.date).format("LLLL")}</p>
        <div className="card">
          <Card>
            <h1>
              <Link to={{
                pathname: '/container/article',
                query: { _id: article._id },
                search: "_id=" + article._id,
              }}
                    onClick={() => dispatch(editArticle(article))}>
                {article.title}
              </Link>
            </h1>
            <div className="tags">
              {article.tags.map((tag, Index) => {
                return <Tag key={tools.generalKey()} className="tag"
                            color={colors[ tools.randomInt(0, colors.length - 1) ]}>{tag}</Tag>
              })}
            </div>
            {
              article.image ? <img src={Http.picUrl(image)} className="image"/> : null
            }
          </Card>
        </div>
      </div>
    )
  }
}

export default connect()(ArticleListItem);