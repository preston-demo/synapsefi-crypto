import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button } from 'antd';
import { withRouter } from "react-router-dom";
import { Typography, Spin  } from 'antd';
import {getUser, oauthUser} from '../../actions';
const { Title } = Typography;

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_data: [],
    }
  }

  async componentDidMount() {
    // get user details
    if(this.state.user_data.length < 1) {
      const user_data = await this.props.getUser();
      const user = await user_data.body.client.id;
      this.setState({user_data: user});
    }
  }

  async oauthUser(e) {
    e.preventDefault();
    const oauth_user = await this.props.oauthUser();
    // redirect
    const location = {
      pathname: '/crypto',
      state: {fromLogin: true}
    }
  
    if(oauth_user) {
      // redirect after successfully authed
      this.props.history.push(location);
    }
  }

  render () {
    return (
      <div className="login-container">
        {this.state.user_data.length < 1 && <Spin size="large" />}
        {this.state.user_data.length > 0 && <Title level={1} className="login-title">Login As A Demo User</Title>}
        {this.state.user_data.length > 0 && <Button type="primary" size={'large'} onClick={this.oauthUser.bind(this)}>Login</Button>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps, {
  getUser,
  oauthUser
})(Login));