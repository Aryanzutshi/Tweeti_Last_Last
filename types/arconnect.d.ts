// global.d.ts or types/arconnect.d.ts
export {};

declare global {
  interface Window {
    arweaveWallet?: {
      connect: (
        permissions: string[],
        appInfo: {
          name: string;
          logo: string;
        },
        gateway?: {
          host: string;
          port: number;
          protocol: string;
        }
      ) => Promise<void>;

      getActiveAddress: () => Promise<string>;

      disconnect?: () => Promise<void>;
    };
  }
}
