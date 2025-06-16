import Features from "@/components/features-vertical";
import Section from "@/components/section";
import { Sparkles, Upload, Zap } from "lucide-react";

const data = [
  {
    id: 1,
    title: "1. Securely Connect in Seconds",
    content:
      "Your journey starts with peace of mind — Tweeti uses a fully serverless, secure-by-design architecture to protect your credentials. No data ever touches a centralized server.",
    image: "/dashboard.png",
    icon: <Upload className="w-6 h-6 text-primary" />,
  },
  {
    id: 2,
    title: "2. Link Your GitHub — Instantly",
    content:
      "Just one click to connect your GitHub. Choose your favorite repos or let Tweeti auto-discover your most active projects. You’re always in control.",
    image: "/dashboard.png",
    icon: <Zap className="w-6 h-6 text-primary" />,
  },
  {
    id: 3,
    title: "3. Watch the Magic Happen",
    content:
      "Tweeti auto-generates tweet-worthy content from your commits and PRs — personalized, polished, and ready to go. You build. We broadcast.",
    image: "/dashboard.png",
    icon: <Sparkles className="w-6 h-6 text-primary" />,
  },
];

export default function Component() {
  return (
    <Section title="How it works" subtitle="Just 3 steps to get started">
      <Features data={data} />
    </Section>
  );
}
