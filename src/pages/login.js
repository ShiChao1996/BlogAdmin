import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;
import Animate from './animate';
import './login.css';
import { Http } from '../utils/http';
import { browserHistory } from 'react-router'

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

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: require('../image/background.png'),
      pixSize: 20,
      pointSize: 10,
      isMode: false,
      show: false,
    };
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
        <a href='/#/articles' id='loginLink' style={{display: 'none'}}>aaaa</a>
        <WrappedNormalLoginForm login={(val) => this.handleLogin(val)}/>
      </div>
    )
  };

  handleLogin(value) {
    Http.post('http://127.0.0.1:7003/admin/login', '', value, function (res) {
      console.log(res)
      Cookies.set('adminToken', res.resp, { expires: 1 });
      //browserHistory.push('/#/articles');
      //location.reload();
      //context.router.push('/#/articles')
      let redirect = document.getElementById('loginLink');
      redirect.click();
    })
  }
}
