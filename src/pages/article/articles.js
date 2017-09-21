import React, {Component} from 'react';
import { Input, Icon, Modal, Button, Form } from 'antd';
import {connect} from "react-redux";

import {Http} from '../../utils/http';
import Table from './table';
import './articles.css';

const FormItem = Form.Item;

class AddForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('title', {
            rules: [ { required: true, message: 'Please input your username!' } ],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }}/>} placeholder="Username"/>
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('tag', {
            rules: [ { required: true, message: 'Please input your Password!' } ],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }}/>} type="password" placeholder="Password"/>
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', {
            rules: [ { required: true, message: 'Please input your Password!' } ],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }}/>} type="password" placeholder="Password"/>
          )}
        </FormItem>
      </Form>
    );
  }
}
const WrappedAddForm = Form.create()(AddForm);


class Articles extends Component{
  constructor(props){
    super(props);
    this.state = {
      articleList: [],
      loading: false,
      visible: false,
    }
  }

  componentWillMount(){
    const token =  this.props.token;
    console.log('token: ', token);
    Http.get(Http.url('article/getlist'), token, (res) => {
      if(res.status === 0){
        let data = res.resp.map((ele, index) => {
          ele.key = index;
          return ele;
        });
        console.log(data)
        this.setState({
          articleList: data
        })
      }
    }, function (err) {
      console.log(err)
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }

  render(){
    return(
      <div className="articles">
        <div>
          <Button type="primary" onClick={this.showModal}>
            Open
          </Button>
          <Modal
            visible={this.state.visible}
            title="Title"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" size="large" onClick={this.handleCancel}>Return</Button>,
              <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
                Submit
              </Button>,
            ]}
          >
            <WrappedAddForm />
          </Modal>
        </div>        <Table dataSource={this.state.articleList} />
      </div>
    )
  }
}

function select(store) {
  return {
    token: store.admin.token
  }
}

export default connect(select)(Articles);
