// import { Icons } from "@/components/icons";
import { Icons } from "../components/icons"

import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "Tweeti",
  description: "Automate your workflow with AI",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: ["SaaS", "Web3", "Next.js", "React", "Tailwind CSS"],
  links: {
    email: "tweeti23official@gmail.com",
    twitter: "https://x.com/usetweeti",
    github: "https://github.com/aryanzutshi",
    instagram: "https://instagram.com/aryanzutshi_/",
  },
  header: [
    {
      trigger: "Features",
      content: {
        main: {
          icon: <Icons.logo className="h-6 w-6" />,
          title: "AI-Powered Automation",
          description: "Streamline your workflow with intelligent automation.",
          href: "https://github.com/apps/tweetii",
        },
        items: [
          {
            href: "#",
            title: "Automate Marketing",
            description:
              "Use AI to generate and schedule posts, optimize engagement, and track campaign performance.",
          },
          {
            href: "#",
            title: "GitHub Documentation Maker",
            description:
              "Auto-generate clean, structured, and consistent project documentation from code and comments.",
          },
          {
            href: "#",
            title: "ARProfiles",
            description:
              "Generate AI-refined developer profiles from GitHub contributions, commits, and project impact.",
          },
        ],
      },
    },
    {
      trigger: "Solutions",
      content: {
        items: [
          {
            title: "For Small Businesses",
            href: "#",
            description: "Tailored automation solutions for growing companies.",
          },
          {
            title: "Enterprise",
            href: "#",
            description: "Scalable AI automation for large organizations.",
          },
          {
            title: "Developers",
            href: "#",
            description: "API access and integration tools for developers.",
          },
          {
            title: "Healthcare",
            href: "#",
            description: "Specialized automation for healthcare workflows.",
          },
          {
            title: "Finance",
            href: "#",
            description: "AI-driven process automation for financial services.",
          },
          {
            title: "Education",
            href: "#",
            description:
              "Streamline administrative tasks in educational institutions.",
          },
        ],
      },
    },
    {
      href: "/blog",
      label: "Blog",
    },
  ],
  pricing: [
    {
      name: "BASIC",
      href: "#",
      price: "Free",
      yearlyPrice: "Free",
      features: [
        "1 User",
        "5GB Storage",
        "Basic Support",
        "Limited API Access",
        "Standard Analytics",
      ],
      description: "Perfect for individuals and small projects",
      buttonText: "Subscribe",
      isPopular: false,
    },
    {
      name: "PRO",
      href: "#",
      price: "$49",
      period: "month",
      yearlyPrice: "$40",
      features: [
        "5 Users",
        "50GB Storage",
        "Priority Support",
        "Full API Access",
        "Advanced Analytics",
      ],
      description: "Ideal for growing businesses and teams",
      buttonText: "Subscribe",
      isPopular: true,
    },
    {
      name: "ENTERPRISE",
      href: "#",
      price: "$99",
      period: "month",
      yearlyPrice: "$82",
      features: [
        "Unlimited Users",
        "500GB Storage",
        "24/7 Premium Support",
        "Custom Integrations",
        "AI-Powered Insights",
      ],
      description: "For large-scale operations and high-volume users",
      buttonText: "Subscribe",
      isPopular: false,
    },
  ],
  faqs: [
    {
      question: "What is Tweeti?",
      answer: (
        <span>
          Tweeti is an AI Powered Marketing tool that uses AI
          to manage your online presence using code. All you
          need is code and an X account and we got you!!
        </span>
      ),
    },
    {
      question: "How can I get started with Tweeti?",
      answer: (
        <span>
          You can get started with Tweeti by signing up for an account on our
          website, filling in some credentials. We also offer tutorials and 
          documentation to help you along the way.
        </span>
      ),
    },
    {
      question: "What types of AI models does Tweeti support?",
      answer: (
        <span>
          Tweeti will support a wide range of AI models, including but not limited
          to OpenAI&apos;s models, deepseek models. Currently, due to costing, we only have 
          support for Gemini&apos;s models.
        </span>
      ),
    },
    {
      question: "Is Tweeti suitable for beginners in development?",
      answer: (
        <span>
          Yes, Tweeti is designed to be user-friendly for both beginners and
          experienced developers. All you need is to focus on your coding and
          leave everything to us.
        </span>
      ),
    },
    {
      question: "What kind of support does Tweeti provide?",
      answer: (
        <span>
          Tweeti provides comprehensive support including documentation, video
          tutorials, a community forum, and dedicated customer support. We also
          offer premium support plans for enterprises with more complex needs.
        </span>
      ),
    },
  ],
  footer: [
    {
      title: "Product",
      links: [
        { href: "#", text: "Features", icon: null },
        { href: "#", text: "Pricing", icon: null },
        { href: "#", text: "Documentation", icon: null },
        { href: "#", text: "API", icon: null },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "#", text: "About Us", icon: null },
        { href: "#", text: "Careers", icon: null },
        { href: "/blog", text: "Blog", icon: null },
        { href: "#", text: "Press", icon: null },
        { href: "#", text: "Partners", icon: null },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "#", text: "Community", icon: null },
        { href: "#", text: "Contact", icon: null },
        { href: "#", text: "Support", icon: null },
        { href: "#", text: "Status", icon: null },
      ],
    },
    {
      title: "Social",
      links: [
        {
          href: "https://x.com/usetweeti",
          text: "Twitter",
          icon: <FaTwitter />,
        },
        {
          href: "https://instagram.com/aryanzutshi_/",
          text: "Instagram",
          icon: <RiInstagramFill />,
        },
        {
          href: "https://www.youtube.com/@aryanzutshi9546",
          text: "Youtube",
          icon: <FaYoutube />,
        },
      ],
    },
  ],
};

export type SiteConfig = typeof siteConfig;
