import { promisify } from "util";

import { glob } from "glob";

export default function globify(globPath: string) {
  return glob(globPath);
}