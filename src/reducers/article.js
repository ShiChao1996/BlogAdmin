/*
 * MIT License
 *
 * Copyright (c) 2017 SmartestEE Inc.
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

"use strict";

import Actions from "../actions/config";
import { tools } from '../utils/tools';

const initialState = {
  article: {}
};

export function article(state = initialState, action) {
  switch (action.type) {
    case Actions.ADD_ARTICLE_TAG: {
      let article = state.article;
      if(article.tags){
        article.tags.push(action.tag);
      }else{
        article.tags = [action.tag];
      }
      return { ...state, article: article };
    }

    case Actions.REMOVE_ARTICLE_TAG: {
      let article = state.article;
      article.tags = article.tags.filter(tag => tag !== action.tag);
      console.log(article.tags)
      return { ...state, article: article };
    }

    case Actions.SAVE_CONTENT: {
      let article = state.article;
      article.content = action.content;
      return { ...state, article: article };
    }

    case Actions.EDIT_ARTICLE: {
      let article = tools.copyAttr(state.article, action.article, true);
      console.log('edit: ', article)
      return { ...state, article: article };
    }

    case Actions.CLEAR: {
      console.log('cleared!!!!!!!', )
      return { ...state, article: {} }
    }

    case Actions.SET_IMAGE: {
      let article = state.article;
      article.img = action.img;
      console.log('hhhhhhhhh')
      return { ...state, article: article }
    }
  }

  return state;
}
