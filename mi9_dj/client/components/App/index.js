import React, {Component} from 'react';

import Header from '../Header';
import Container from '../Container';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header/>
        <Container {...this.props}/>
      </div>
    );
  }
}