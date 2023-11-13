"use client";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import { RadioStoreState } from "./audioState/store";

const Player = () => {
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

  console.log("player", url, isPlaying, volume);

  return (
    <ReactPlayer
      url={url}
      playing={isPlaying}
      volume={volume / 100}
      onProgress={(progress) => {
        // console.log(progress);
      }}
    />
  );
};

export default Player;
