import React, {Component} from 'react';

import PlaylistPanel from '../PlaylistPanel';
import SearchPanel from '../SearchPanel';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <PlaylistPanel {...this.props}/>
        <SearchPanel/>
      </div>
    );
  }
}