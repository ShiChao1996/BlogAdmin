import React, {Component} from 'react';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;
import Animate from './animate';
import './login.css';
import { Http } from '../utils/http';
import {connect} from "react-redux";
import {
  login,
  setTags
} from '../actions/index';

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { login } = this.props;
        console.log('Received values of form: ', values);
        login(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [ { required: true, message: 'Please input your username!' } ],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }}/>} placeholder="Username"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [ { required: true, message: 'Please input your Password!' } ],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }}/>} type="password" placeholder="Password"/>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: require('../image/a.png'),
      pixSize: 20,
      pointSize: 10,
      isMode: false,
      show: false,
    };
  }

  componentWillMount(){
    this.get_set_tags();
  }

  get_set_tags(){
    Http.get(Http.url('article/gettags'), '', (res) => {
      if(res.status === 0){
        this.props.dispatch(setTags(res.resp.tags));
      }
    })
  }

  render() {
    return (
        <Animate child={this.child}
                 image={this.state.image}
                 pixSize={this.state.pixSize}
                 pointSizeMin={this.state.pointSize} />
    )
  }

  child = () => {
    return (
      <div className='loginBox'>
        <a href='/#/container' id='loginLink' style={{display: 'none'}}>aaaa</a>
        <WrappedNormalLoginForm login={(val) => this.handleLogin(val)}/>
      </div>
    )
  };

  handleLogin(value) {
    Http.post(Http.url('admin/login'), '', value, (res) => {
      console.log(res)
      if(res.status === 0){
        this.props.dispatch(login(res.resp));
      }
      // todo: 注释的方法只能实现url变化，无法跳转，用reload会导致短暂白屏。暂时用模拟点击实现跳转
      //browserHistory.push('/#/articles');
      //location.reload();
      //context.router.push('/#/articles')
      let redirect = document.getElementById('loginLink');
      redirect.click();
    })
  }
}


function select(store) {
  return {
    logged: store.admin.logged,
    token: store.admin.token
  }
}

export default connect(select)(Login);
