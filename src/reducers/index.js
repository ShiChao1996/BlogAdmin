import {combineReducers} from "redux";
import { admin } from './admin';
import { article } from "./article";
import { tags } from "./tags";

module.exports = combineReducers( {
  admin: admin,
  article: article,
  tags: tags
});