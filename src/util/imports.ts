export function clearCache(filePath: string) {
  delete require.cache[require.resolve(filePath)];
}

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