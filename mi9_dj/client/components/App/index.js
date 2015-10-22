import React, {Component} from 'react';

import Header from '../Header';
import Container from '../Container';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Container/>
      </div>
    );
  }
}