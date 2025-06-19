"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function ProjectForm({
  onSubmit,
}: {
  onSubmit: (data: any) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    techStack: "",
    goal: "",
    coreModules: "",
    features: "",
    structureHint: "",
    publicInterfaces: "",
    constraints: "",
    audience: "",
  });
  const [advanced, setAdvanced] = useState(false);

  const { data: session } = useSession();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleConnectClick(e: React.FormEvent) {
    e.preventDefault();

    if (!session) {
      signIn("github");
    } else {
      const prepared = {
        ...formData,
        coreModules: formData.coreModules
          .split(/[,\n]+/)
          .map((s) => s.trim())
          .filter(Boolean),
        features: formData.features
          .split(/[,\n]+/)
          .map((s) => s.trim())
          .filter(Boolean),
        structureHint: formData.structureHint
          .split(/[,\n]+/)
          .map((s) => s.trim())
          .filter(Boolean),
        publicInterfaces: formData.publicInterfaces
          .split(/[,\n]+/)
          .map((s) => s.trim())
          .filter(Boolean),
        constraints: formData.constraints
          .split(/[,\n]+/)
          .map((s) => s.trim())
          .filter(Boolean),
      };
      onSubmit(prepared);
    }
  }

  return (
    <form
      onSubmit={handleConnectClick}
      className="space-y-6 bg-zinc-900 p-6 rounded-lg border border-zinc-800"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="My LLM-Powered App"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Short Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="What does it do?"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="techStack">Tech Stack</Label>
        <Input
          id="techStack"
          name="techStack"
          placeholder="Next.js, Solidity, Rust, etc."
          value={formData.techStack}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="goal">Project Goal or Motivation</Label>
        <Textarea
          id="goal"
          name="goal"
          placeholder="Why are you building this?"
          value={formData.goal}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center justify-between py-2">
        <Label>Advanced Fields</Label>
        <Switch checked={advanced} onCheckedChange={setAdvanced} />
      </div>

      {advanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="coreModules">Core Modules</Label>
            <Textarea
              id="coreModules"
              name="coreModules"
              placeholder="FirewallEngine, AIClassifier, etc. (comma or line-separated)"
              value={formData.coreModules}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Key Features</Label>
            <Textarea
              id="features"
              name="features"
              placeholder="Bullet list of features or use cases"
              value={formData.features}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="structureHint">Folder Structure Hints</Label>
            <Input
              id="structureHint"
              name="structureHint"
              placeholder="src/, lib/, contracts/, etc."
              value={formData.structureHint}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="publicInterfaces">Public Interfaces / APIs</Label>
            <Textarea
              id="publicInterfaces"
              name="publicInterfaces"
              placeholder="Endpoints, functions, CLI commands"
              value={formData.publicInterfaces}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="constraints">Constraints or Requirements</Label>
            <Textarea
              id="constraints"
              name="constraints"
              placeholder="E.g., Only EVM compatible, needs Node >=18"
              value={formData.constraints}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience</Label>
            <Input
              id="audience"
              name="audience"
              placeholder="Auditors, researchers, beginners, etc."
              value={formData.audience}
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      <div className="pt-4">
        {session ? (
          <div className="space-y-4">
            <p className="text-sm text-green-500">
              ✅ Connected as {session.user?.email}
            </p>
            <div className="flex gap-4">
              <Button type="submit" className="w-full">
                Submit & Continue
              </Button>
              <Button variant="ghost" type="button" onClick={() => signOut()}>
                Sign out
              </Button>
            </div>
          </div>
        ) : (
          <Button type="submit" className="w-full">
            Generate Documentation
          </Button>
        )}
      </div>
    </form>
  );
}
