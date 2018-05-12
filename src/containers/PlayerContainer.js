import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import Player from "react-sound";

import {
  switchPlaybackState,
  changeVolume,
  updatePlaybackPosition,
  changeSong
} from "../actionCreators";
import { getCurrentSong } from "../selectors";

class PlayerContainer extends Component {
  theRef = createRef();
  // state = { position: 0 };

  render() {
    const {
      currentSong,
      currentSongId,
      playbackState,
      playbackPosition,
      volume,
      updatePlaybackPosition,
      changeSong,
      playlist
    } = this.props;

    if (currentSongId) {
      return (
        <Player
          url={currentSong.url}
          playStatus={
            playbackState ? Player.status.PLAYING : Player.status.PAUSED
          }
          position={+playbackPosition}
          volume={+volume}
          onPlaying={info => {
            updatePlaybackPosition(info.position);
          }}
          onFinishedPlaying={() => {
            const idx = playlist.findIndex(song => song.id === currentSong.id);
            changeSong(playlist[idx + 1].id);
          }}
        />
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  const {
    currentSongId,
    playbackState,
    volume,
    playbackPosition,
    playlist
  } = state;
  return {
    currentSongId,
    currentSong: getCurrentSong(state),
    playbackState,
    volume,
    playbackPosition,
    playlist
  };
};

const actionCreators = {
  switchPlaybackState,
  changeVolume,
  updatePlaybackPosition,
  changeSong
};

export default connect(mapStateToProps, actionCreators)(PlayerContainer);