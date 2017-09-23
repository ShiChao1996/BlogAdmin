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
    if (this.props.article) {
      this.setState({
        text: this.props.article.content
      })
    }
  }

  saveArticle() {
    this.props.dispatch(saveContent(this.state.text));
    this.props.closeModal && this.props.closeModal();
  }

  render() {
    return (
      <div className='detailContainer'>
        <div className="content">
          <Row>
            <Col span={12}>
              <TextArea rows={30}
                        defaultValue={this.state.text}
                        onChange={(e) => this.setState({ text: e.target.value })}/>
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

function select(store) {
  return {
    token: store.admin.token,
    article: store.article.article
  }
}
export default connect(select)(ArticleDetail);
