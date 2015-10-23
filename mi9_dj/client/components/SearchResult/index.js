import React, {Component} from 'react';

import addVideo from '../../websocket';

export default class SearchResult extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="search-result">
        <img src={this.props.image} />
        <h4>{this.props.title}</h4>
        <button onClick={addVideo(this.props.code)}>Add to Playlist</button>
      </div>
    );
  }
}