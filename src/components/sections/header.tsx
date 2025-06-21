"use client";

import Drawer from "@/components/drawer";
import { Icons } from "@/components/icons";
import Menu from "@/components/menu";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { saveXCredentials } from "@/app/actions/saveXCredentials";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [addBorder, setAddBorder] = useState(false);
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

  const handleConnectX = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowXModal(true);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          addBorder && "border-border/40"
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="mr-4 hidden md:flex">
            <Link
              href="/"
              title="brand-logo"
              className="relative mr-6 flex items-center space-x-2"
            >
              <Image
                src="/Tweeti_Logo.jpg"
                alt="Tweeti Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="font-bold text-xl">{siteConfig.name}</span>
            </Link>
          </div>

          <div className="hidden lg:block">
            <div className="flex items-center">
              <nav className="mr-10">
                <Menu />
              </nav>

              <div className="gap-2 flex items-center">
                <Link
                  href=""
                  onClick={handleConnectX}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Connect X API
                </Link>
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

      {statusType && (
        <div
          className={cn(
            "fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-md shadow-md transition-all duration-300 z-[9999]",
            statusType === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-purple-100 text-purple-800 border border-purple-300"
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