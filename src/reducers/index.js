import {combineReducers} from "redux";
import { admin } from './admin';
import { article } from "./article";

module.exports = combineReducers( {
  admin: admin,
  article: article
});