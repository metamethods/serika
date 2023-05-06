import Files from "./Files";

import { importFileDefault } from "./imports";

export default async function loadModule(
  modules: string,
  callback: (
    file: (...args: any) => any | void
  ) => void
) {
  const files = new Files(`modules/${modules}/**/*.ts`, true);

  for (const file of await files.find()) { 
    const module = await importFileDefault(file, true);

    callback(module);
  }
}