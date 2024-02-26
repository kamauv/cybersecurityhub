import slugify from "slugify";
import crypto from "crypto";

export const slugifyString = (string: string) => {
  return slugify(`${string}`, {
    lower: true,
    strict: true,
  });
};
