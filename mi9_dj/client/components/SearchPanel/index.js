import React, {Component} from 'react';

import SearchBody from '../SearchBody';
import {addVideo} from '../../websocket';

export default class SearchPanel extends Component {
  addVideoFromCode (){
    const field = document.getElementById('search');
    const code = field.value;
    addVideo(code);
    field.value = '';
  }

  render() {
    return (
      <div className="search-panel">
        <input id="search" type="text" autoFocus="autofocus" placeholder="Search terms or full URL" /> <input type="button" value="Add/Search" onClick={this.addVideoFromCode} />
        <SearchBody/>
      </div>
    );
  }
}