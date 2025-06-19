"use client";

import Drawer from "@/components/drawer";
import { Icons } from "@/components/icons";
import Menu from "@/components/menu";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { connectWallet } from "@/lib/arutils";
import { saveXCredentials } from "@/app/actions/saveXCredentials";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const [addBorder, setAddBorder] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletInfo, setWalletInfo] = useState<{
    balance: string;
    config: {
      gateway: string;
      appName: string;
    };
  } | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);
  const [showXModal, setShowXModal] = useState(false);
  const [xCredentials, setXCredentials] = useState({
    apiKey: "",
    apiSecret: "",
    accessToken: "",
    accessSecret: "",
    clientSecret: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      setAddBorder(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleConnectWallet = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      const address = await connectWallet();
      if (!address) throw new Error("No address returned");

      setWalletAddress(address);
      setShowXModal(true);

      const res = await fetch(`https://arweave.net/wallet/${address}/balance`);
      const balanceWinston = await res.text();
      const balanceAR = (+balanceWinston / 1e12).toFixed(4);

      setWalletInfo({
        balance: balanceAR,
        config: {
          gateway: "https://g8way.io",
          appName: "Tweeti",
        },
      });
    } catch (err) {
      console.error("Wallet connection failed", err);
      setStatusMessage("Wallet connection failed.");
      setStatusType("error");
    }
  };

  const handleDisconnectWallet = () => {
    setWalletAddress(null);
    setWalletInfo(null);
    setShowXModal(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 py-2 bg-background/60 backdrop-blur">
        <div className="flex justify-between items-center container">
          <Link
            href="/"
            title="brand-logo"
            className="relative mr-6 flex items-center space-x-2"
          >
            <Icons.logo className="w-auto h-[40px]" />
            <span className="font-bold text-xl">{siteConfig.name}</span>
          </Link>

          <div className="hidden lg:block">
            <div className="flex items-center">
              <nav className="mr-10">
                <Menu />
              </nav>

              <div className="gap-2 flex items-center">
                {!walletAddress ? (
                  <Link
                    href=""
                    onClick={handleConnectWallet}
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Connect Wallet
                  </Link>
                ) : (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className={cn(
                          "text-sm font-mono truncate max-w-[150px] px-3 py-2 border rounded-md",
                          "bg-muted hover:bg-muted/80"
                        )}
                      >
                        {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72">
                      <h3 className="font-semibold text-lg mb-3">Wallet Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Balance:</span> {walletInfo?.balance} AR
                        </div>
                        <div>
                          <span className="font-medium">Connected via:</span>
                          <div className="text-xs text-muted-foreground">
                            {walletInfo?.config.gateway}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">App:</span> {walletInfo?.config.appName}
                        </div>
                      </div>
                      <button
                        onClick={handleDisconnectWallet}
                        className={cn("mt-4 w-full", buttonVariants({ variant: "destructive" }))}
                      >
                        Disconnect
                      </button>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
          </div>

          <div className="mt-2 cursor-pointer block lg:hidden">
            <Drawer />
          </div>
        </div>

        <hr
          className={cn(
            "absolute w-full bottom-0 transition-opacity duration-300 ease-in-out",
            addBorder ? "opacity-100" : "opacity-0"
          )}
        />
      </header>

      {walletAddress && walletInfo && (
        <Card className="container mt-4 bg-gradient-to-br from-muted/50 to-background border border-muted p-4 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold flex items-center gap-2">
                Connected Wallet <Badge variant="outline">Arweave</Badge>
              </div>
              <Button variant="destructive" onClick={handleDisconnectWallet}>
                Disconnect
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm">
            <div>
              <span className="font-medium text-muted-foreground">Address:</span> <span className="font-mono">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Balance:</span> {walletInfo.balance} AR
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Gateway:</span> {walletInfo.config.gateway}
            </div>
            <div>
              <span className="font-medium text-muted-foreground">App:</span> {walletInfo.config.appName}
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground italic">
            Securely connected via ArConnect.
          </CardFooter>
        </Card>
      )}

      {statusType && (
        <div
          className={cn(
            "fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-md shadow-md transition-all duration-300 z-[9999]",
            statusType === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          )}
        >
          {statusMessage}
        </div>
      )}

      {showXModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="text-2xl">🔗 Connect X (Twitter) API</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Securely link your X developer credentials to generate automated tweets powered by Tweeti.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "API Key", key: "apiKey" },
                { label: "API Secret", key: "apiSecret" },
                { label: "Access Token", key: "accessToken" },
                { label: "Access Secret", key: "accessSecret" },
                { label: "Client Secret", key: "clientSecret" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    {label}
                  </label>
                  <Input
                    placeholder={`Enter ${label}`}
                    value={xCredentials[key as keyof typeof xCredentials]}
                    onChange={(e) =>
                      setXCredentials({
                        ...xCredentials,
                        [key]: e.target.value,
                      })
                    }
                  />
                </div>
              ))}
              <div className="pt-2 text-sm text-muted-foreground">
                Need help? {" "}
                <a
                  href="https://quilled-shade-493.notion.site/Tweeti-Doc-20f961b7fc938065b603e4059fff29c6?source=copy_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Learn how to get your X credentials →
                </a>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-3">
              <Button variant="ghost" onClick={() => setShowXModal(false)} className="w-full">
                Cancel
              </Button>
              <Button
                className="w-full"
                disabled={
                  !xCredentials.apiKey ||
                  !xCredentials.apiSecret ||
                  !xCredentials.accessToken ||
                  !xCredentials.accessSecret ||
                  !xCredentials.clientSecret
                }
                onClick={async () => {
                  try {
                    const result = await saveXCredentials(xCredentials);
                    if (result.success) {
                      setStatusMessage("Credentials saved successfully! 🔐");
                      setStatusType("success");
                      setShowXModal(false);
                    } else {
                      throw new Error("Unknown server error");
                    }
                  } catch (error: any) {
                    console.error("Save failed:", error);
                    setStatusMessage("Failed to save credentials. Please try again later.");
                    setStatusType("error");
                  } finally {
                    setTimeout(() => {
                      setStatusMessage("");
                      setStatusType(null);
                    }, 4000);
                  }
                }}
              >
                Save & Connect
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}