import React from 'react';

const LoginLoadingPage = ({social}) => {
  const style = {
    margin: "5rem auto",
    width: "300px",
    textAlign: "center",
    fontSize: "1.5rem"
  }

  return (
    <div style={style}>
      {social}로그인 중 입니다.
    </div>
  );
};

export default LoginLoadingPage;
