import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, FileText, Users } from "lucide-react";

const problems = [
  {
    title: "Inconsistent Online Presence",
    description:
      "Maintaining a strong online presence is challenging—posting regularly, staying relevant, and engaging with an audience often fall by the wayside amid busy development cycles.",
    icon: Globe,
  },
  {
    title: "Undocumented Codebases",
    description:
      "Many developers struggle to document their code consistently, especially on fast-paced projects—leading to technical debt, onboarding friction, and maintainability issues.",
    icon: FileText,
  },
  {
    title: "Lack of a Dev Ecosystem",
    description:
      "Most individuals don't have access to a thriving ecosystem of active developers, making it harder to find collaborators, share feedback, and stay motivated to build regularly.",
    icon: Users,
  },
];

export default function Component() {
	return (
		<Section
			title="Problem"
			subtitle="Maintaining your presence is a hassle."
		>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
				{problems.map((problem, index) => (
					<BlurFade key={index} delay={0.2 + index * 0.2} inView>
						<Card className="bg-background border-none shadow-none">
							<CardContent className="p-6 space-y-4">
								<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
									<problem.icon className="w-6 h-6 text-primary" />
								</div>
								<h3 className="text-xl font-heading tracking-heading font-semibold">
									{problem.title}
								</h3>
								<p className="text-muted-foreground font-body tracking-body">
									{problem.description}
								</p>
							</CardContent>
						</Card>
					</BlurFade>
				))}
			</div>
		</Section>
	);
}
