import React, {Component} from 'react';

import PlaylistPanel from '../PlaylistPanel';
import SearchPanel from '../SearchPanel';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <PlaylistPanel/>
        <SearchPanel/>
      </div>
    );
  }
}