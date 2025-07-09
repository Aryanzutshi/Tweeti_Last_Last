import Features from "@/components/features-vertical";
import Section from "@/components/section";
import { Sparkles, Upload, Zap } from "lucide-react";

const data = [
  {
    id: 1,
    title: "1. Securely Connect with GitHub",
    content:
      "Log in with GitHub and authorize Tweeti. We only save your GitHub username. No private data, no clutter.",
    image: "/Tweeti_Feature-1.png",
    icon: <Upload className="w-6 h-6 text-primary" />,
  },
  {
    id: 2,
    title: "2. Securely Connect with X (Twitter)",
    content:
      "Connect with your X (Twitter) account so Tweeti can share your progress on X.",
    image: "/Tweeti_Feature-2.png",
    icon: <Zap className="w-6 h-6 text-primary" />,
  },
  {
    id: 3,
    title: "3. Install the tweeti GitHub App",
    content:
      "Install app on the repos you want — install for all or pick specific ones. That’s it! A one-time setup, and you’re ready to let your work market itself.",
    image: "/X_Photo-Features.png",
    icon: <Sparkles className="w-6 h-6 text-primary" />,
  },
];

export default function Component() {
  return (
    <Section title="How it works" subtitle="Get started with Tweeti in 3 easy steps">
      <Features data={data} />
    </Section>
  );
}
