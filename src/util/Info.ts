import chalk from "chalk";

export const statusPresets = {
  "Ok": chalk.green.italic,
  "Warn": chalk.yellow.italic,
  "Error": chalk.red.bold,
  "Info": chalk.blue.bold,

  "Awaiting": chalk.gray.italic,
}

export type StatusData = [ 
  text: string,
  color?: string // hex color
]

export type Status = StatusData | string;

export default class Info {
  constructor(
    public name?: string
  ) {}

  private getLogStringLiteral(
    status: Status,
    message: string
  ): string {
    if (typeof status === "string") 
      status = [status, undefined];

    const colorFunction = 
      status[1] 
      ? chalk.hex(status[1]) 
      : statusPresets[status[0] as keyof typeof statusPresets];

    const currentDate = new Date();
    const timedFormat = `[${
      currentDate.toLocaleTimeString("en-US", {hour12: true})
        .replace(/(AM|PM)/i, '')
        .trim()
    }.${currentDate.getMilliseconds().toString().padStart(3, "0")}]`

    const name = this.name ? `${this.name} ` : "";

    return `${chalk.gray(timedFormat)} ${chalk.bold(name)}[${colorFunction(status[0])}]: ${message}`;
  }

  static write(
    status: Status,
    message: string
  ) {
    new Info().write(status, message);
  }

  public write(
    status: Status,
    message: string
  ) {
    console.log(this.getLogStringLiteral(status, message));
  }

  public tree(
    status: Status,
    ...tree: string[]
  ) {
    
  }
  
  public writeRun<R>(
    status: Status,
    message: string,

    run: (...args: any) => R,
    ...args: any
  ): R {
    this.write(status, message);
    return run(...args);
  }
}