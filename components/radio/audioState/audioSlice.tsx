"use client";

import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { sanityClient } from "@/sanity/lib/client";
import ReactPlayer from "react-player";
import React, { RefObject } from "react";

export type RadioAudio = {
  title: string;
  url: string;
};

export type Audio = RadioAudio & {
  artist: string;
};

export type Channel = {
  name: string;
  audios: Array<Audio> | RadioAudio;
};

export interface RadioState {
  channelList: Array<Channel>;
  currentChannel: Channel;
  currentAudio: Audio | RadioAudio;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
}

const initialState: RadioState = {
  channelList: [],
  currentChannel: {
    name: "",
    audios: [],
  },
  currentAudio: {
    title: "",
    artist: "",
    url: "",
  },
  isPlaying: false,
  volume: 0,
  currentTime: 0,
  duration: 0,
};

export const radioSlice = createSlice({
  name: "radio",
  initialState,
  reducers: {
    initState: (state, action: PayloadAction<Array<Channel>>) => {
      state.channelList = action.payload;
      state.currentChannel = action.payload[0];
      if (Array.isArray(action.payload[0].audios)) {
        state.currentAudio = action.payload[0].audios[0];
      } else {
        state.currentAudio = action.payload[0].audios;
      }
    },
    setChannelList: (state, action: PayloadAction<Array<Channel>>) => {
      state.channelList = action.payload;
    },
    setCurrentChannel: (state, action: PayloadAction<Channel>) => {
      state.currentChannel = action.payload;
    },
    setCurrentAudio: (state, action: PayloadAction<Audio>) => {
      state.currentAudio = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      if (state.volume === 0 && action.payload > 0) {
        state.isPlaying = true;
      } else if (state.volume > 0 && action.payload === 0) {
        state.isPlaying = false;
      }
      state.volume = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    playPause: (state) => {
      if (state.volume > 0) {
        state.isPlaying = !state.isPlaying;
      }
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      if (state.volume > 0) {
        state.isPlaying = action.payload;
      }
    },
    playNext: (state) => {
      if (state.volume > 0) {
        if (Array.isArray(state.currentChannel.audios)) {
          if (!state.currentChannel.audios.length) return;
          let index = state.currentChannel.audios.findIndex(
            (audio) => audio.title === state.currentAudio.title
          );
          if (index === state.currentChannel.audios.length - 1) {
            index = 0;
          } else {
            index++;
          }
          state.currentAudio = state.currentChannel.audios[index];
        }
      }
    },
    playPre: (state) => {
      if (state.volume > 0) {
        if (Array.isArray(state.currentChannel.audios)) {
          if (!state.currentChannel.audios.length) return;
          let index = state.currentChannel.audios.findIndex(
            (audio) => audio.title === state.currentAudio.title
          );
          if (index === 0) {
            index = state.currentChannel.audios.length - 1;
          } else {
            index--;
          }
          state.currentAudio = state.currentChannel.audios[index];
        }
      }
    },
    loopToNextChannel: (state) => {
      if (state.volume > 0) {
        if (!state.channelList.length) return;
        let index = state.channelList.findIndex(
          (channel) => channel.name === state.currentChannel.name
        );
        if (index === state.channelList.length - 1) {
          index = 0;
        } else {
          index++;
        }
        state.currentChannel = state.channelList[index];
        if (Array.isArray(state.currentChannel.audios)) {
          state.currentAudio = state.currentChannel.audios[0];
          state.currentTime = 0;
        } else {
          state.currentAudio = state.currentChannel.audios;
        }
      }
    },
  },
});

export const {
  setPlaying,
  initState,
  setChannelList,
  setCurrentChannel,
  setCurrentAudio,
  playPause,
  setVolume,
  setCurrentTime,
  playNext,
  playPre,
  loopToNextChannel,
} = radioSlice.actions;

export default radioSlice.reducer;
