import React, {Component} from 'react';

import Container from '../Container';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container {...this.props}/>
    );
  }
}