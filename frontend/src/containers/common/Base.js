import React, { Component } from 'react';
import LoginModalContainer from 'containers/modal/LoginModalContainer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';

class Base extends Component {
  initialize = async () => {
    const { BaseActions } = this.props;

    if (!localStorage.loggedInfo) return ;

    BaseActions.setLoggedInfo(JSON.parse(localStorage.loggedInfo));

    try {
      await BaseActions.checkLoginStatus();
    } catch (e) {
      localStorage.removeItem('loggedInfo');
      console.log(e);
    }
  }

  componentDidMount() {
    this.initialize();
  }

  render() {
    return (
      <LoginModalContainer />
    );
  }
}

export default connect(
  null,
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(Base);
