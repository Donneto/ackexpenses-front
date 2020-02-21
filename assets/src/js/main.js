import '../scss/master.scss';

// Dependencies
import React from 'react';
import { render } from 'react-dom';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from 'react-router-dom';

class App extends React.Component {

  render() {
    const name = 'adolfo';

    return (
      <h1>Hello, {name}</h1>
    );
  }
}

render(<App />, document.getElementById('app'));
