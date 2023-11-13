import { Song } from "@/sanity/schemas/song";
import { Audio } from "./audioSlice";

type TempChannelListFromSanity = {
  [key: string]: {
    name: string;
    audios: Audio[];
  };
};

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
        pre[genre].audios.push(song);
      }
    });
    return pre;
  }, {} as TempChannelListFromSanity);

  const channelList = Object.values(channels).toSorted((a, b) =>
    a.name.localeCompare(b.name)
  );
  return channelList;
};
