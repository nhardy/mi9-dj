import React, {Component} from 'react';

import Header from '../Header';
import SearchBody from '../SearchBody';
import {addVideo} from '../../websocket';

export default class SearchPanel extends Component {
  constructor(props) {
    super(props);
  }

  addVideoFromCode (){
    const field = document.getElementById('search');
    const code = field.value;
    addVideo(code);
    field.value = '';
  }

  render() {
    return (
      <div className="search-panel">
        <Header/>
        <input id="search" type="text" autoFocus="autofocus" placeholder="Search terms or full URL" /> <input type="button" value="Add/Search" onClick={this.addVideoFromCode} />
        <SearchBody results={this.props.results}/>
      </div>
    );
  }
}