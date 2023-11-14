import { Song } from "@/sanity/schemas/song";
import { Audio, Channel, RadioAudio } from "./audioSlice";

type TempChannelListFromSanity = {
  [key: string]: {
    name: string;
    audios: Audio[] | RadioAudio;
  };
};

const RadioAudios = [
  "http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8",
  "http://walterebert.com/playground/video/hls/sintel-trailer.m3u8",
];

export const sanityDataToChannelList = (songs: Song[]) => {
  const channels = songs.reduce((pre, cur) => {
    const genres = cur.genres;
    const song = {
      title: cur.name,
      artist: cur.artist,
      url: cur.audioFile,
    };
    genres.forEach((genre) => {
      if (!pre[genre]) {
        pre[genre] = {
          name: genre,
          audios: [song],
        };
      } else {
        (pre[genre].audios as Audio[]).push(song);
      }
    });
    return pre;
  }, {} as TempChannelListFromSanity);

  const channelList = Object.values(channels).toSorted((a, b) =>
    a.name.localeCompare(b.name)
  );

  const RadioChannels = RadioAudios.map((url, i) => {
    return {
      name: `radio ${i + 1}`,
      audios: { title: `radio ${i + 1}`, url },
    };
  }) as Array<Channel>;

  const allChannelList = channelList.concat(RadioChannels);

  return allChannelList;
};
