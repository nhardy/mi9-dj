import React, {Component} from 'react';

export default class PlaylistPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="playlist-panel">
        <h1>Hello, World!</h1>
        {JSON.stringify(this.props)}
      </div>
    );
  }
}