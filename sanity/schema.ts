import { type SchemaTypeDefinition } from "sanity";
import petSchema from "./schemas/pet";
import songSchema from "./schemas/song";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [petSchema, songSchema],
};
