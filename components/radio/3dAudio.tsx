"use client";

import { useLoader, useThree } from "@react-three/fiber";
import { useOnce } from "./radioMain";
import { useEffect, useRef } from "react";
import { url } from "inspector";
import { AudioLoader, Audio, AudioListener } from "three";

type ThreeAudioProps = {
  url: string;
  isPlaying: boolean;
  volume: number;
  onEnded: () => void;
};

const ThreeAudio = (props: ThreeAudioProps) => {
  const { url, isPlaying: playing, volume, onEnded } = props;
  const sound = useRef<THREE.Audio>();
  const { camera } = useThree();
  const buffer = useLoader(AudioLoader, url);

  useEffect(() => {
    const listener = new AudioListener();
    camera.add(listener);

    const audio = new Audio(listener);
    audio.setBuffer(buffer);
    audio.setLoop(false);
    audio.setVolume(volume);
    sound.current = audio;

    return () => {
      camera.remove(listener);
    };
  }, [buffer, camera]);

  useEffect(() => {
    if (sound.current) {
      sound.current.setVolume(volume);
    }
  }, [volume]);

  useEffect(() => {
    if (playing) {
      sound.current?.play();
    } else {
      sound.current?.pause();
    }
  }, [playing]);

  useEffect(() => {
    const handleEnd = () => {
      onEnded && onEnded();
    };

    const audio = sound.current;
    if (audio) {
      audio.onEnded = handleEnd;
    }
    return () => {
      audio && (audio.onEnded = () => {});
    };
  }, [onEnded]);

  return null;
};

export default ThreeAudio;
