import React, {Component} from 'react';

import PlaylistControl from '../PlaylistControl';
import PlaylistItem from '../PlaylistItem';

export default class PlaylistPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const children = this.props.playlist.map(function(item) {
      return(
        <PlaylistItem {...item}/>
      );
    });

    return (
      <div className="playlist-panel">
        <PlaylistControl playing={this.props.playing}/>
        <div>
          <h3>Playlist</h3>
        </div>
        {children}
      </div>
    );
  }
}