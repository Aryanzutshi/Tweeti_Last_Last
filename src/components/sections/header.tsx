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

export default function Header() {
  const [addBorder, setAddBorder] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
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
      if (window.scrollY > 20) {
        setAddBorder(true);
      } else {
        setAddBorder(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleConnectWallet = async (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    try {
      await connectWallet();
      setIsWalletConnected(true);
      setShowXModal(true);
    } catch (err) {
      console.error("Wallet connection failed", err);
    }
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

              <div className="gap-2 flex">
                <Link
                  href=""
                  onClick={handleConnectWallet}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Connect Wallet
                </Link>
                {/* <Link
                  href="/signup"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "w-full sm:w-auto text-background flex gap-2"
                  )}
                >
                  <Icons.logo className="h-6 w-6" />
                  Get Started for Free
                </Link> */}
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

      {/* Modal for X API Credentials */}
      {showXModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg w-[90%] max-w-md shadow-2xl space-y-6">
            <h2 className="text-2xl font-semibold text-center">
              Enter X API Credentials
            </h2>

            <div className="space-y-4">
              {[
                { label: "API Key", key: "apiKey" },
                { label: "API Secret", key: "apiSecret" },
                { label: "Access Token", key: "accessToken" },
                { label: "Access Secret", key: "accessSecret" },
                { label: "Client Secret", key: "clientSecret" },
              ].map(({ label, key }) => (
                <div key={key} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                  </label>
                  <input
                    type="text"
                    placeholder={`Enter ${label}`}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
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
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 pt-2">
              Need help?{" "}
              <a
                href="https://quilled-shade-493.notion.site/Tweeti-Doc-20f961b7fc938065b603e4059fff29c6?source=copy_link"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Learn how to find your X credentials →
              </a>
            </p>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowXModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-gray-900 dark:text-white rounded-md transition"
              >
                Cancel
              </button>
              <button
                disabled={
                  !xCredentials.apiKey ||
                  !xCredentials.apiSecret ||
                  !xCredentials.accessToken ||
                  !xCredentials.accessSecret ||
                  !xCredentials.clientSecret
                }
                onClick={async () => {
                  const result = await saveXCredentials(xCredentials);

                  if (result.success) {
                    console.log("Saved successfully");
                    setShowXModal(false);
                    // optionally show toast or confirmation
                  } else {
                    console.error("Failed to save credentials", result.error);
                    // show user-friendly error if needed
                  }
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
