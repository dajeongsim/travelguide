import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { EditorPage, JoinPage, ListPage, LoginLoadingPage, MainPage, NotFoundPage, PostPage } from 'pages';
import Base from 'containers/common/Base';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/category=:category/page/:page?" component={ListPage} />
        <Route path="/tag/:tag/:page?" component={ListPage} />
        <Route path="/post/:id" component={PostPage} />
        <Route path="/editor" component={EditorPage} />
        <Route path="/register" component={JoinPage} />
        <Route path="/naverLogin" render={
          (props)=>(<LoginLoadingPage {...props} social="네이버" />)} />
        <Route component={NotFoundPage} />
      </Switch>
      <Base />
      </div>
    );
  }
}

export default App;
