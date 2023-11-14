"use client";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import { RadioStoreState } from "./audioState/store";
import { playNext } from "./audioState/audioSlice";
import React, { useEffect } from "react";
import { useOnce } from "./radioMain";

const Player = () => {
  const dispatch = useDispatch();

  const ref = React.useRef<ReactPlayer>(null);

  const currentAudio = useSelector(
    (state: RadioStoreState) => state.radioReducer.currentAudio
  );
  const isPlaying = useSelector(
    (state: RadioStoreState) => state.radioReducer.isPlaying
  );

  const currentChannel = useSelector(
    (state: RadioStoreState) => state.radioReducer.currentChannel
  );
  if (Array.isArray(currentChannel.audios)) {
    if (currentChannel.audios.length === 1) {
    }
  }

  const volume = useSelector(
    (state: RadioStoreState) => state.radioReducer.volume
  );

  const { url } = currentAudio;

  return (
    <ReactPlayer
      ref={ref}
      url={url}
      playing={isPlaying}
      volume={volume / 100}
      onEnded={() => {
        if (Array.isArray(currentChannel.audios)) {
          if (currentChannel.audios.length === 1) {
            ref.current?.seekTo(0);
          }
        } else {
          dispatch(playNext());
        }
        dispatch(playNext());
      }}
    />
  );
};

export default Player;
