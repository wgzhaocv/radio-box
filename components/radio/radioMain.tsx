"use client";

import { useDispatch } from "react-redux";
import RadioModel from "./radioModel";
import {
  setChannelList,
  setCurrentChannel,
  setCurrentAudio,
  playPause,
  setVolume,
  setCurrentTime,
  playNext,
  playPre,
  loopToNextChannel,
  setPlaying,
  initState,
} from "./audioState/audioSlice";
import Player from "./player";
import { Song } from "@/sanity/schemas/song";
import { useEffect } from "react";
import { ClientOnly } from "../clientOnly";
import React from "react";
import { sanityDataToChannelList } from "./audioState/dataSource";

export const useOnce = (fn: () => void) => {
  const [called, setCalled] = React.useState(false);
  if (!called) {
    fn();
    setCalled(true);
  }
};

const MyRadio = (props: { songs: Song[] }) => {
  const dispatch = useDispatch();
  useOnce(() => {
    // get sanity songs
    const channelList = sanityDataToChannelList(props.songs);
    dispatch(initState(channelList));
  });
  return (
    <ClientOnly>
      <div>
        <RadioModel
          playPause={() => dispatch(playPause())}
          setPlayPause={(isPlaying: boolean) => dispatch(setPlaying(isPlaying))}
          playNext={() => dispatch(playNext())}
          playPre={() => dispatch(playPre())}
          setVolume={(volume: number) => dispatch(setVolume(volume))}
          nextChannel={() => dispatch(loopToNextChannel())}
        />
        <div style={{ visibility: "hidden" }}>
          <Player />
        </div>
      </div>
    </ClientOnly>
  );
};

export default MyRadio;
