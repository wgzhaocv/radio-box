"use client";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import { RadioStoreState } from "./audioState/store";
import { playNext } from "./audioState/audioSlice";

const Player = () => {
  const dispatch = useDispatch();

  const currentAudio = useSelector(
    (state: RadioStoreState) => state.radioReducer.currentAudio
  );
  const isPlaying = useSelector(
    (state: RadioStoreState) => state.radioReducer.isPlaying
  );

  const volume = useSelector(
    (state: RadioStoreState) => state.radioReducer.volume
  );

  const { url } = currentAudio;

  return (
    <ReactPlayer
      url={url}
      playing={isPlaying}
      volume={volume / 100}
      onEnded={() => dispatch(playNext())}
    />
  );
};

export default Player;
