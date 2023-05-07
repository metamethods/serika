declare global {
  namespace NodeJS {
    interface ProcessEnv {
      token: string;
      id: string;
      mongoURI: string;
    }
  }
}

export {};