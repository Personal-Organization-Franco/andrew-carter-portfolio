export {};
declare module "*.svg" {
  const content: any;
  export default content;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly CONTENTFUL_ACCESS_TOKEN: string;
    }
  }
}
