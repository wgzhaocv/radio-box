import { groq } from "next-sanity";
import { sanityClient } from "./client";

import { type Song } from "../schemas/song";

const getAllsongs = groq`*[_type == "song"]{
    _id,
    name,
    artist,
    genres,
    "audioFile": audioFile.asset->url
}
`;

export function getAllSongs(): Promise<Song[]> {
  return sanityClient.fetch(getAllsongs);
}
