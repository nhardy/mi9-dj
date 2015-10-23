import React, {Component} from 'react';

export default class PlaylistItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="playlist-item">
        <img src={this.props.image} />
        <h4>{this.props.title}</h4>
      </div>
    );
  }
}