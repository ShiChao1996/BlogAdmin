import React, { Component } from 'react';
import {
  Card,
  Affix,
  Button
} from 'antd';
import MarkDown from '../../components/markdown';
import TopBar from '../../components/topBar';
import Container from '../../container/container';
import './articleDetail.css';
import { Http } from '../../utils/http';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    console.log(Http)
    Http.post('http://127.0.0.1:7001/animaldetail/get', { id: 1 }, (data) => {
      //let md = JSON.parse(data.resp.content);
      let md = data.resp.content
      console.log(md)

      this.setState({
        text: md
      })
    }, (err) => console.log(err))
  }

  render() {
    let child = () => <div className='content'><MarkDown text={this.state.text} /></div>;
    return (
      <Container child={child} />
    )
  }
}