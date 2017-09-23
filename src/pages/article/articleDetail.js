import React, { Component } from 'react';
import {
  Input,
  Row,
  Col,
  Button
} from 'antd';
import MarkDown from '../../components/markdown';
import './articleDetail.css';
import { connect } from "react-redux";
import {
  saveContent
} from '../../actions/index';

const { TextArea } = Input;

class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {

  }

  saveArticle(){
    console.log('fdfdfdfdf')
    this.props.dispatch(saveContent(this.state.text))
  }

  render() {
    return (
      <div className='detailContainer'>
        <div className="content">
          <Row>
            <Col span={12}>
              <TextArea rows={30} onChange={(e) => this.setState({text: e.target.value})} />
            </Col>
            <Col span={12}>
              <div className='markDownContainer'>
                <MarkDown text={this.state.text}/>
              </div>
            </Col>
          </Row>
        </div>
        <Button onClick={() => this.saveArticle()} className='saveBtn'>save content</Button>
      </div>
    )
  }
}

export default connect()(ArticleDetail);
