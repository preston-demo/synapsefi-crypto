import React, { Component } from 'react'
import Routes from './routes';
import { Layout } from 'antd';
const {Header, Content} = Layout;

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class App extends Component {
  render () {
    return (
      <Layout id="app-container">
          <Header>
            <a href="/" className="brand w-nav-brand w--current">
              <img src="https://global-uploads.webflow.com/5834df15ba1afbe6203ba6db/5b9bfe2c4caae3d3b6020b6d_synapsefi_white_teal.png" width="197" alt="" className="nav-logo"/>
            </a>
          </Header>
          <Content className="app-content">
            <Routes/>
          </Content>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  browser: state.browser
});

export default withRouter(connect(mapStateToProps, {})(App));