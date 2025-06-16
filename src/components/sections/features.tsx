import Features from "@/components/features-horizontal";
import Section from "@/components/section";
import { Users, Sparkles, FileText, Rocket } from "lucide-react";

const data = [
  {
    id: 1,
    title: "Auto-Generate Tweets from GitHub",
    content: "Show off your grind. Instantly turn commits into engaging tweets that grow your dev brand — while you build.",
    image: "/dashboard.png",
    icon: <Rocket className="h-6 w-6 text-primary" />,
  },
  {
    id: 2,
    title: "One-Click GitHub Docs",
    content: "Hate writing docs? We got you. Create clean, structured GitHub documentation in seconds — straight from your code.",
    image: "/dashboard.png",
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
  {
    id: 3,
    title: "Automated Tweet Threads with AI",
    content: "Drop your changelog. Our LLMs turn it into fire tweet threads, launch posts, and community updates — hands-free.",
    image: "/dashboard.png",
    icon: <Sparkles className="h-6 w-6 text-primary" />,
  },
  {
    id: 4,
    title: "Connect With Builders Instantly",
    content: "Your work speaks. Discover and connect with like-minded devs, contributors, and collaborators across the chain.",
    image: "/dashboard.png",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
];

export default function Component() {
  return (
    <Section title="Features" subtitle="User Flows and Navigational Structures">
      <Features collapseDelay={5000} linePosition="bottom" data={data} />
    </Section>
  );
}
