import React, { Component } from 'react';
import Header from 'components/common/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { withRouter } from 'react-router-dom';
import * as baseActions from 'store/modules/base';

class HeaderContainer extends Component {
  handleLoginClick = async () => {
    const { logged } = this.props;
    const { BaseActions } = this.props;

    if(logged) {
      try {
        await BaseActions.logout();
        localStorage.removeItem('loggedInfo');
        window.location.reload(); // 새로고침
      } catch (e) {
        console.log(e);
      }
      return ;
    }

    BaseActions.showModal('login');
    BaseActions.initializeLoginModal();
  }

  render() {
    const { handleLoginClick } = this;
    const { userMemId, logged } = this.props;
    return (
      <Header userMemId={userMemId} logged={logged} onLoginClick={handleLoginClick} />
    );
  }
}

export default connect(
  (state) => ({
    userMemId: state.base.getIn(['loggedInfo', 'userMemId']),
    logged: state.base.get('logged')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(HeaderContainer);
// )(withRouter(HeaderContainer));
