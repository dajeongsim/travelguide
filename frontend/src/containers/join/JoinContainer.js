import React, { Component } from 'react';
import Register from 'components/join/Register';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmail, isLength, isAlphanumeric } from 'validator';
import { withRouter } from 'react-router';
import debounce from 'lodash/debounce';
import * as joinActions from 'store/modules/join';
import * as baseActions from 'store/modules/base';

class JoinContainer extends Component {
  componentDidUpdate() {
    const { logged, history } = this.props;

    if(logged) {
      history.push('/');
    }
  }

  setError = (error) => {
    const { JoinActions } = this.props;

    JoinActions.setError(error);
  }

  validate = {
    id: (value) => {
      if(!value) {
        this.setError('아이디를 입력해주세요.');
        return false;
      } else if(!isAlphanumeric(value) || !isLength(value, { min: 4, max: 10 })) {
        this.setError('아이디는 4~10 자리의 영문 또는 숫자만 입력 가능합니다.');
        return false;
      }
      return true;
    },
    password: (value) => {
      if(!isLength(value, { min: 8, max: 12 })) {
        this.setError('비밀번호를 8~12 자리로 입력해주세요.')
        return false;
      }
      this.setError(null);
      return true;
    },
    passwordConfirm: (value) => {
      const { password } = this.props.userInfo
      if(value !== password) {
        this.setError('비밀번호가 일치하지 않습니다.');
        return false;
      }
      this.setError(null);
      return true;
    },
    name: (value) => {
      if(!value) {
        this.setError('이름을 입력해주세요.');
        return false;
      }
      return true;
    },
    email: (value) => {
      if(!value) {
        this.setError('이메일을 입력해주세요.');
        return false;
      } else if(!isEmail(value)) {
        this.setError('잘못된 이메일 형식입니다.');
        return false;
      }
      return true;
    }
  }

  checkIdExists = debounce(async (id) => {
    const { JoinActions } = this.props;

    await JoinActions.checkIdExists(id);
    if(this.props.exists.id) {
      this.setError('이미 존재하는 아이디입니다.');
    } else {
      this.setError(null);
    }
  }, 300);

  checkEmailExists = debounce(async (email) => {
    const { JoinActions } = this.props;

    await JoinActions.checkEmailExists(email);
    if(this.props.exists.email) {
      this.setError('이미 존재하는 이메일입니다.');
    } else {
      this.setError(null);
    }
  }, 300);

  handleChangeInput = (e) => {
    const { JoinActions } = this.props;
    const { checkIdExists, checkEmailExists } = this;
    const { name, value } = e.target;

    JoinActions.changeInput({name, value});

    const validation = this.validate[name](value);
    if(!validation) return ;

    name === 'id' ? checkIdExists(value) : checkEmailExists(value);
  }

  handleRegister = async () => {
    const { error, history } = this.props;
    const { id, password, passwordConfirm, name, email } = this.props.userInfo;
    const { JoinActions, BaseActions } = this.props;
    const { validate } = this;

    if(error || !validate.id(id) || !validate.password(password) || !validate.passwordConfirm(passwordConfirm) || !validate.name(name) || !validate.email(email)) return ;

    try {
      await JoinActions.register({id, password, name, email});
      alert(`${id}님 회원가입을 축하드립니다.`);

      await BaseActions.login({id, password});
      localStorage.loggedInfo = JSON.stringify(this.props.loggedInfo.toJS());
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { userInfo, error } = this.props;
    const { handleChangeInput, handleRegister } = this;

    return (
      <Register userInfo={userInfo} error={error} onChangeInput={handleChangeInput} onRegister={handleRegister} />
    );
  }
}

export default connect(
  (state) => ({
    userInfo: state.join.get('userInfo').toJS(),
    exists: state.join.get('exists').toJS(),
    error: state.join.get('error'),
    loggedInfo: state.base.get('loggedInfo'),
    logged: state.base.get('logged')
  }),
  (dispatch) => ({
    JoinActions: bindActionCreators(joinActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(JoinContainer));
