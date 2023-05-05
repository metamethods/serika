import globify from "./globify"

export default class Files {
  constructor(
    public path: string,
    public srcDirectory?: boolean
  ) {}

  static async find(
    globPath: string,
    srcDirectory?: boolean
  ): Promise<string[]> {
    return await globify(`${srcDirectory ? `${process.cwd()}/src/` : ""}${globPath.replace(/\\/g, `/`)}`);
  }

  public async find(): Promise<string[]> {
    return await Files.find(this.path, this.srcDirectory);
  }
}