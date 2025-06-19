export async function connectWallet(): Promise<string | undefined> {
  try {
    if (!window.arweaveWallet) {
      alert("No Arconnect detected");
      return;
    }

    await window.arweaveWallet.connect(
      ["ACCESS_ADDRESS", "SIGN_TRANSACTION", "ACCESS_TOKENS"],
      {
        name: "Tweeti",
        logo: "/Tweeti_logo.png",
      },
      {
        host: "g8way.io",
        port: 443,
        protocol: "https",
      }
    );

    const address = await window.arweaveWallet.getActiveAddress();

    return address;
  } catch (error) {
    console.error("Wallet connection error:", error);
  } finally {
    console.log("Connection finished execution");
  }
}
