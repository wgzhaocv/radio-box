import { defineField, defineType } from "sanity";
import { z } from "zod";

export const Song = z.object({
  _id: z.string(),
  name: z.string(),
  artist: z.string(),
  genres: z.array(z.string()),
  audioFile: z.string(),
});

export type Song = z.infer<typeof Song>;

export default defineType({
  name: "song",
  title: "Song",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "artist",
      title: "Artist",
      type: "string",
    }),
    // url 字段不需要在这里定义，因为它将由 Sanity 在上传音频时自动生成
    defineField({
      name: "genres",
      title: "Genres",
      type: "array",
      of: [{ type: "string" }],
    }),
    // 如果你想要手动添加一个用于上传音频文件的字段
    defineField({
      name: "audioFile",
      title: "Audio File",
      type: "file",
      options: {
        // 限制文件类型，如果需要
        accept: "audio/*",
      },
    }),
  ],
});
