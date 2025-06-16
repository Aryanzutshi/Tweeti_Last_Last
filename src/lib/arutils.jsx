export async function connectWallet() {
    try {
      if (!window.arweaveWallet) {
        alert('No Arconnect detected');
        return;
      }
      await global.arweaveWallet.connect(
        ['ACCESS_ADDRESS', 'SIGN_TRANSACTION', 'ACCESS_TOKENS'],
        {
          name: 'Tweeti',
          logo: 'https://arweave.net/jAvd7Z1CBd8gVF2D6ESj7SMCCUYxDX_z3vpp5aHdaYk',
        },
        {
          host: 'g8way.io',
          port: 443,
          protocol: 'https',
        }
      );
      console.log('connected');
      return 'connected wallet successfully';
    } catch (error) {
      console.error(error);
    } finally {
      console.log('connection finished execution');
    }
  }  