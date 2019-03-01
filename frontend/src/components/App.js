import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { EditorPage, JoinPage, ListPage, MainPage, NotFoundPage, PostPage } from 'pages';
// import aaaa from './01.png';
// import cccc from './그림04.png';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/page/:page" component={ListPage} />
        <Route path="/tag/:tag/:page?" component={ListPage} />
        <Route path="/post/:id" component={PostPage} />
        <Route path="/editor" component={EditorPage} />
        <Route path="/register" component={JoinPage} />
        <Route component={NotFoundPage} />
      </Switch>
      {/* <Base /> */}
      </div>
    );
  }
}

export default App;
