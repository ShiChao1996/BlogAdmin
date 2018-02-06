import React, { Component } from 'react';
import {
  Input,
  Row,
  Col,
  Button,
  Spin
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
    this.state = {
      text: '',
      loading: false
    }
  }

  componentWillMount() {
    if (this.props.article.content) {
      this.setState({
        text: this.props.article.content,
        loading: this.props.loading
      })
    }
  }

  componentWillReceiveProps(props){
    this.setState({
      text: props.article.content || '',
      loading: props.loading
    })
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
              {
                this.state.loading ?
                  <div>
                    <Spin size="large"/>
                  </div> : null
              }
              <TextArea rows={30}
                        value={this.state.text}
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
