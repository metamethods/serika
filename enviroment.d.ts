declare global {
  namespace NodeJS {
    interface ProcessEnv {
      token: string;
      id: string;
    }
  }
}

export {};