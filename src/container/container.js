import React, { Component } from 'react'
import {
  Route,
  Link
} from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Avatar } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
import './index.css';

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { child } = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="avatar-sider">
            <Avatar  size={this.state.collapsed ? "default": "large"}
                     src="https://tse1-mm.cn.bing.net/th?id=OIP.fEstyBvbrWiYhLRPDqv55wHaHa&w=160&h=160&c=7&o=5&pid=1.7"/>
          </div>
          <Menu theme="dark" defaultSelectedKeys={[ '1' ]} mode="inline">
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="pie-chart"/>
                <span>Option 1</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop"/>
              <span>Option 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="file"/>
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}/>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Lovae ©2018
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

