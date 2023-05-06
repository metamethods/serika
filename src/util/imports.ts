export function clearCache(filePath: string) {
  delete require.cache[require.resolve(filePath)];
}

// export function getFileImportPath(targetPath: string): string {
//   const relativePath = __dirname.replace(process.cwd(), "");
//   const upDirectory = "../".repeat(relativePath.split("\\").length - 1);

//   return `${upDirectory}${targetPath.replace(/\\/g, "/")}`;
// }

// export function removeFileExtension(filePath: string): string {
//   return filePath.split(".").slice(0, -1).join(".");
// }

export async function importFile(
  filePath: string,
  reload?: boolean,
) {
  filePath = `${process.cwd()}/${filePath.replace(process.cwd(), "").replace(/\\/g, "/")}`

  if (reload) 
    clearCache(filePath);

  return await import(filePath); 
}

export async function importFileDefault(
  filePath: string,
  reload?: boolean,
) {
  return (await importFile(filePath, reload)).default;
}