import React, { Component } from 'react';
import LoginModal from 'components/modal/LoginModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';

import { withRouter } from 'react-router';
import dotenv from 'dotenv';
dotenv.config();

class LoginModalContainer extends Component {
  handleCheckInput = () => {
    const { BaseActions } = this.props;
    const { id, password } = this.props;

    BaseActions.checkInputValid({id, password});
  }

  handleLogin = async () => {
    const { BaseActions } = this.props;
    const { id, password, modalValid } = this.props;

    await BaseActions.checkInputValid({id, password});

    if (modalValid) {
      try {
        await BaseActions.login({id, password});

        BaseActions.hideModal('login');
        localStorage.loggedInfo = JSON.stringify(this.props.loggedInfo.toJS());
      } catch (e) {
        console.log(e);
      }
    }
  }

  handleNaverLogin = () => {
    const { REACT_APP_CLIENT_ID: clientId } = process.env;
    var state = "A5SEi89vn2eiEIWO35ewRji15m";
    var redirectURI = encodeURI("http://localhost:3000/naverLogin");
    var api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + clientId + '&redirect_uri=' + redirectURI + '&state=' + state;

    window.open(api_url, '네이버로그인', `width=500, height=640, top=${document.body.offsetHeight/2-320}, left=${document.body.offsetWidth/2-250}, location=no`);
  }

  handleCancel = () => {
    const { BaseActions } = this.props;

    BaseActions.hideModal('login');
  }

  handleChange = (e) => {
    const { BaseActions } = this.props;

    BaseActions.changeUserInput({name: e.target.name, value: e.target.value});
  }

  handleKeyPress = async (e) => {
    const { handleCheckInput, handleLogin } = this;
    if(e.key==='Enter') {
      await handleCheckInput();
      handleLogin();
    }
  }

  render() {
    const { visible, id, password, error, logged } = this.props;
    const { handleLogin, handleNaverLogin, handleCancel, handleChange, handleCheckInput, handleKeyPress } = this;

    return (
      <LoginModal visible={visible} id={id} password={password} error={error} logged={logged} onLogin={handleLogin} onNaverLogin={handleNaverLogin} onCancel={handleCancel} onChange={handleChange} onCheckInput={handleCheckInput} onKeyPress={handleKeyPress} />
    );
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['modal', 'login']),
    id: state.base.getIn(['loginModal', 'id']),
    password: state.base.getIn(['loginModal', 'password']),
    error: state.base.getIn(['loginModal', 'error']),
    modalValid: state.base.getIn(['loginModal', 'valid']),
    logged: state.base.get('logged'),
    loggedInfo: state.base.get('loggedInfo')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(LoginModalContainer));
