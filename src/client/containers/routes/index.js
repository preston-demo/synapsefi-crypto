import { Route, Switch, Redirect, location} from 'react-router-dom';
import React, { Component } from 'react';
import LoginPage from '../../views/Login';
import CryptoPage from '../../views/Crypto';

class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
        in: false
    }
  }

  render () {
    return (
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/crypto" component={CryptoPage} />
      </Switch>
    )
  }
}

export default Routes