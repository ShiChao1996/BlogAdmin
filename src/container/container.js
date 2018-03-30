import React, { Component } from 'react'
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Avatar
} from 'antd';
import './index.css';
import ArticleList from '../components/list';
import ArticleDetail from '../components/articleDetail';
import File from '../pages/files/files';
import Articles from '../pages/article/articles';

const { Header, Content, Footer, Sider } = Layout;

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
    const { child, location } = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="avatar-sider">
            <Avatar size={this.state.collapsed ? "default" : "large"}
                    src="https://tse1-mm.cn.bing.net/th?id=OIP.fEstyBvbrWiYhLRPDqv55wHaHa&w=160&h=160&c=7&o=5&pid=1.7"/>
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Link to="/container/list">
                <Icon type="pie-chart"/>
                <span>Articles</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/container/articles">
                <Icon type="desktop"/>
                <span>Me</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/container/file">
                <Icon type="file"/>
                <span>File</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={styles.header}>
            <Bread breadcrumbs={location.pathname.split("/")}/>
          </Header>
          <Content
            style={styles.content}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Switch>
                <Route path="/container/article" component={ArticleDetail}/>
                <Route path="/container/file" component={File}/>
                <Route path="/container/articles" component={Articles}/>
                <Route path="/container/" component={ArticleList}/>
              </Switch>
            </div>
          </Content>
          <Footer style={styles.footer}>
            Lovae ©2018
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

class Bread extends Component {
  render() {
    const { breadcrumbs } = this.props;
    return (
      <Breadcrumb style={{ margin: '16px' }}>
        {
          breadcrumbs.map((b, i) => {
            return (
              <Breadcrumb.Item key={i}>{b}</Breadcrumb.Item>
            )
          })
        }
      </Breadcrumb>
    )
  }
}

const styles = {
  content: {
    height: document.body.clientHeight - 150,
    padding: 10,
    overflowY: "scroll",
    backgroundColor: "#fff",
  },

  footer: {
    textAlign: 'center',
    backgroundColor: "#efefef",
  },

  header: {
    background: '#efefef',
    padding: 0,
  }
};