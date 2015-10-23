import React, {Component} from 'react';

import Header from '../Header';
import SearchBody from '../SearchBody';
import {addVideo} from '../../websocket';
import {results} from '../../apiClient';
import state from '../../state';

export default class SearchPanel extends Component {
  constructor(props) {
    super(props);
  }

  addVideoFromCode() {
    const field = document.getElementById('search');
    const code = field.value;
    addVideo(code);
    field.value = '';
  }

  searchVideos() {
    const field = document.getElementById('search');
    const query = field.value;
    if (query.length < 2){
      state.setState({searchResults: []});
      return;
    }
    results(query).then(function(searchResults) {
      console.log('searchResults', searchResults);
      state.setState({searchResults: searchResults});
    })
  }

  render() {
    return (
      <div className="search-panel">
        <Header/>
        <input id="search" type="text" autoFocus="autofocus" placeholder="Search terms or full URL" onKeyDown={this.searchVideos} /> <input type="button" value="Add/Search" onClick={this.searchVideos} />
        <SearchBody results={this.props.results}/>
      </div>
    );
  }
}