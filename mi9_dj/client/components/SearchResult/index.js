import React, {Component} from 'react';

import {addVideo} from '../../websocket';

export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.addVideoToPlaylist = this.addVideoToPlaylist.bind(this);
  }

  addVideoToPlaylist() {
    console.log('this', this);
    addVideo(this.props.code);
  }

  render() {
    return (
      <div className="search-result">
        <img src={this.props.image} />
        <h4>{this.props.title}</h4>
        <button onClick={this.addVideoToPlaylist}>Add to Playlist</button>
      </div>
    );
  }
}