import React, {Component} from 'react';

import SearchBody from '../SearchBody';

export default class HelloWorld extends Component {
  render() {
    return (
      <div className="search-panel">
        <input type="text" autoFocus="autofocus" placeholder="Search terms or full URL" /> <input type="button" value="Add/Search" />
        <SearchBody/>
      </div>
    );
  }
}