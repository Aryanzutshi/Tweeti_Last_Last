"use client";

import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, GitPullRequest, Link2 } from "lucide-react";

const solutions = [
  {
    title: "Tweet Generation",
    description:
      "Tweeti convert your code commits, pull requests, and project updates into engaging, professional tweets that showcase your work.",
    icon: Sparkles,
  },
  {
    title: "Auto-Document Everything",
    description:
      "Your README stays up to date — so your project is always clear, well-documented, and effortless for anyone to understand or onboard.",
    icon: GitPullRequest,
  },
  {
    title: "Build in Public, Grow Faster",
    description:
      "Build your developer brand and grow your network by maintaining an active presence across GitHub and X (Twitter) simultaneously.",
    icon: Link2,
  },
];

export default function Component() {
	return (
		<Section
			title="Solution"
			subtitle="Empower Your Business with Tweeti"
			description="Generic AI tools won't suffice. Our platform is purpose-built to provide exceptional AI-driven solutions for your unique business needs."
			className="bg-neutral-100 dark:bg-neutral-900"
		>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
				{solutions.map((solution, index) => (
					<BlurFade key={index} delay={0.2 + index * 0.2} inView>
						<Card className="bg-background border-none shadow-none">
							<CardContent className="p-6 space-y-4">
								<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
									<solution.icon className="w-6 h-6 text-primary" />
								</div>
								<h3 className="text-xl font-heading tracking-heading font-semibold">
									{solution.title}
								</h3>
								<p className="text-muted-foreground font-body tracking-body">
									{solution.description}
								</p>
							</CardContent>
						</Card>
					</BlurFade>
				))}
			</div>
		</Section>
	);
}
