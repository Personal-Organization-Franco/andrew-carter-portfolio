export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly CONTENTFUL_ACCESS_TOKEN: string;
    }
  }
}
