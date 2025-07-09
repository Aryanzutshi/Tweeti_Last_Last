"use client";

import Drawer from "@/components/drawer";
import { signIn, useSession } from "next-auth/react";
import Menu from "@/components/menu";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { data: session } = useSession();
  const [addBorder, setAddBorder] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);
  const [showXModal, setShowXModal] = useState(false);
  const [xCredentials, setXCredentials] = useState({
    access_token: "",
    access_secret: "",
  });

  const isGithubConnected = Boolean(session?.user);
  const isXConnected = Boolean(xCredentials.access_token && xCredentials.access_secret);

  // Debug logs
  useEffect(() => {
    console.log("🔍 GitHub connected:", isGithubConnected);
    console.log("🔍 X connected:", isXConnected);
    console.log("🔍 X credentials:", xCredentials);
  }, [session, xCredentials]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const modalParam = url.searchParams.get("modal");

    if (modalParam === "x") {
      setShowXModal(true);
      url.searchParams.delete("modal");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  useEffect(() => {
    if (isGithubConnected && isXConnected) {
      setShowXModal(false);
      setStatusType("success");
      setStatusMessage("🎉 Both GitHub and X are connected!");
    }
  }, [isGithubConnected, isXConnected]);

  const handleSignIn = async () => {
    await signIn("github", {
      callbackUrl: `${window.location.origin}?modal=x`,
    });
  };

  useEffect(() => {
    const handleScroll = () => setAddBorder(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleConnectX = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowXModal(true);
  };

  const getXCredentials = async () => {
    try {
      const popup = window.open(
        `https://xauth-s7vs.onrender.com/auth/twitter`,
        "_blank",
        "width=500,height=600"
      );

      if (!popup) {
        setStatusType("error");
        setStatusMessage("Popup blocked. Please allow popups and try again.");
        return;
      }

      const messageListener = async (event: MessageEvent) => {
        if (event.data?.access_token && event.data?.access_secret) {
          const github_username =
            session?.user?.name || session?.user?.email || "";

          const tokenData = {
            github_username,
            access_token: event.data.access_token,
            access_secret: event.data.access_secret,
          };

          console.log("🐛 Sending X credentials:", tokenData);

          setXCredentials({
            access_token: tokenData.access_token,
            access_secret: tokenData.access_secret,
          });

          try {
            const res = await fetch("/api/save-x-credentials", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(tokenData),
            });

            if (!res.ok) throw new Error("Failed to save credentials");

            setStatusType("success");
            setStatusMessage("✅ Token received and saved successfully");
          } catch (err) {
            console.error("❌ Failed to save credentials:", err);
            setStatusType("error");
            setStatusMessage("❌ Token received but failed to save");
          }

          window.removeEventListener("message", messageListener);
          popup.close();
        }
      };

      window.addEventListener("message", messageListener);
    } catch (err) {
      console.error("X OAuth error:", err);
      setStatusType("error");
      setStatusMessage("❌ Failed to connect to X. Try again.");
    }
  };

  return (
    <>
      {/* Header */}
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
              className="relative mr-6 flex items-center"
            >
              <Image
                src="/Tweeti_Logo.png"
                alt="Tweeti Logo"
                width={100}
                height={100}
              />
            </Link>
          </div>

          <div className="hidden lg:block">
            <div className="flex items-center">
              <nav className="mr-10">
                <Menu />
              </nav>

              <div className="gap-2 flex items-center">
                {isGithubConnected && isXConnected ? (
                  <div className="inline-flex items-center text-green-700 font-medium border border-green-200 px-3 py-2 rounded-md text-sm bg-green-50">
                    ✅ Connected
                  </div>
                ) : (
                  <Link
                    href=""
                    onClick={handleConnectX}
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Connect GitHub & X
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="mt-2 cursor-pointer block lg:hidden">
            <Drawer />
          </div>
        </div>
      </header>

      {/* Status Toast */}
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

      {/* X Connect Modal */}
      {showXModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <Card className="relative w-full max-w-lg">
            <button
              onClick={() => setShowXModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-semibold"
              aria-label="Close"
            >
              ×
            </button>

            <CardHeader>
              <CardTitle className="text-2xl font-heading tracking-heading">🔗 Connect GitHub & X</CardTitle>
              <p className="text-sm font-body tracking-body text-muted-foreground mt-1">
                Securely link your X and GitHub developer credentials to generate automated tweets powered by Tweeti.
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm font-body tracking-body text-muted-foreground">
                <span>
                  {isGithubConnected && isXConnected
                    ? "Step 2 of 2"
                    : isGithubConnected
                    ? "Step 2 of 2"
                    : "Step 1 of 2"}
                </span>
                <span>
                  {isGithubConnected && isXConnected
                    ? "You're all set!"
                    : isGithubConnected
                    ? "Now connect to X"
                    : "Connect GitHub first"}
                </span>
              </div>

              <Progress
                value={
                  isGithubConnected && isXConnected ? 100 : isGithubConnected ? 50 : 0
                }
                className="h-2"
              />

              <div className="pt-2 text-sm font-body tracking-body text-muted-foreground">
                Need help?{" "}
                <a
                  href="https://tweeti.vercel.app/blog/how-we-manage-data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-body tracking-body"
                >
                  Learn how we manage your data →
                </a>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between gap-3">
              {isGithubConnected ? (
                <div className="w-full flex items-center justify-center gap-2 border border-muted rounded-md px-4 py-2 text-sm text-green-700 font-medium">
                  <Check className="h-4 w-4 text-green-600" />
                  GitHub is active
                </div>
              ) : (
                <Button
                  variant="ghost"
                  onClick={handleSignIn}
                  className="w-full flex items-center justify-center gap-2"
                >
                  Connect to GitHub
                </Button>
              )}

              <Button
                className="w-full text-white-900 bg-blue-600 hover:bg-blue-700"
                onClick={getXCredentials}
                disabled={!isGithubConnected || isXConnected}
              >
                {isXConnected ? (
                  <>
                    <Check className="h-4 w-4 text-white" />
                    Connected to X
                  </>
                ) : (
                  "Connect to X"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
