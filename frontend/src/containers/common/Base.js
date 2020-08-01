import React, { Component } from 'react';
import LoginModalContainer from 'containers/modal/LoginModalContainer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import { withRouter } from 'react-router';

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

  getUrlParams() {
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) {
      params[key] = value; });
    return params;
  }

  naverLogin = async () => {
    const { location, history } = this.props;
    const { BaseActions } = this.props;
    const { code, state } = this.getUrlParams();

    if (location.pathname==='/naverLogin') {
      if (!code || !state) {
        alert('잘못된 접근입니다');
        history.push('/');
      }
      await BaseActions.nLogin({code, state});
      localStorage.loggedInfo = JSON.stringify(this.props.loggedInfo.toJS());
      window.opener.parent.location.reload();
      window.close();
    }
  }

  componentDidMount() {
    this.initialize();
    this.naverLogin();
  }

  render() {
    return (
      <LoginModalContainer />
    );
  }
}

export default connect(
  (state) => ({
    loggedInfo: state.base.get('loggedInfo')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(Base));
