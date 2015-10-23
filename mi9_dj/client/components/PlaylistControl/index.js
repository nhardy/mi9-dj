import React, {Component} from 'react';

import {togglePlayback} from '../../websocket';

export default class PlaylistControl extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const controlImage = this.props.playing ? '/images/pause.png' : '/images/next.png';

    return (
      <div className="playlist-control">
        <div>
          <img src="/images/options.png" />
        </div>
        <div>
          <img src={controlImage} onClick={togglePlayback}/>
        </div>
        <div>
          <img src="/images/volume.png" />
        </div>
      </div>
    );
  }
}