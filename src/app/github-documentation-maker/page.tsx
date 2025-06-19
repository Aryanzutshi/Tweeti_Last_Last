"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Octokit } from "octokit";
import ProjectForm from "@/components/github-docs-form";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface TreeNode {
  name: string;
  path: string;
  children?: TreeNode[];
}

export default function GithubPage() {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<any[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const accessToken = (session as any)?.accessToken;

  useEffect(() => {
    if (accessToken) {
      const octokit = new Octokit({ auth: accessToken });
      octokit.rest.repos
        .listForAuthenticatedUser({ per_page: 100, sort: "updated" })
        .then((res) => {
          const sorted = res.data
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 50);
          setRepos(sorted);
        })
        .catch((err) => console.error("Error fetching repos", err));
    }
  }, [accessToken]);

  function addToTree(tree: TreeNode[], parts: string[], fullPath: string): TreeNode[] {
    const [head, ...rest] = parts;
    const node = tree.find((n) => n.name === head);

    if (!head) return tree;

    if (!node) {
      const newNode: TreeNode = {
        name: head,
        path: rest.length === 0 ? fullPath : head,
        children: rest.length > 0 ? addToTree([], rest, fullPath) : undefined,
      };
      return [...tree, newNode];
    } else if (rest.length > 0) {
      node.children = addToTree(node.children || [], rest, fullPath);
    }
    return tree;
  }

  async function fetchRelevantFiles(repoFullName: string) {
    if (!accessToken) return;
    setLoading(true);
    const [owner, repo] = repoFullName.split("/");
    const octokit = new Octokit({ auth: accessToken });
    const dirs = ["src", "lib", "utils"];
    const allFiles: any[] = [];

    for (const dir of dirs) {
      try {
        const res = await octokit.rest.repos.getContent({ owner, repo, path: dir });
        if (Array.isArray(res.data)) {
          allFiles.push(...res.data.filter(f => f.type === "file"));
        }
      } catch (err) {
        // folder doesn't exist, skip
      }
    }

    setFiles(allFiles);

    let newTree: TreeNode[] = [];
    for (const file of allFiles) {
      newTree = addToTree(newTree, file.path.split("/"), file.path);
    }
    setTree(newTree);
    setLoading(false);
  }

  function toggleFileSelection(path: string) {
    setSelectedFiles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) newSet.delete(path);
      else newSet.add(path);
      return newSet;
    });
  }

  function renderTree(nodes: TreeNode[]) {
    return (
      <ul className="ml-4">
        {nodes.map((node) => (
          <li key={node.path} className="py-1">
            {node.children ? (
              <>
                <span className="font-semibold text-blue-400">📁 {node.name}</span>
                {renderTree(node.children)}
              </>
            ) : (
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedFiles.has(node.path)}
                  onChange={() => toggleFileSelection(node.path)}
                />
                <span className="text-gray-200">📄 {node.name}</span>
              </label>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-blue-400 mb-2">GitHub Docs Maker</h1>
      <p className="text-center text-zinc-400 mb-8 text-lg">
        ✍️ Generate smart, structured documentation from your repo — in minutes.
      </p>

      {!session ? (
        <div className="space-y-6 bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <p className="text-gray-100 text-lg">
            🔐 You&apos;re not connected to GitHub. Choose one of the following:
          </p>
          <ul className="list-disc pl-5 text-md text-gray-300">
            <li>Manually enter your project information</li>
            <li>Or connect to GitHub to import project structure</li>
          </ul>
          <button
            onClick={() => signIn("github")}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            🚀 Connect GitHub & Import Code
          </button>

          <hr className="my-6 border-zinc-700" />

          <div className="bg-zinc-800 p-6 rounded-md border border-zinc-700">
            <ProjectForm onSubmit={(data) => alert(JSON.stringify(data))} />
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <p className="text-gray-300 text-lg">
              ✅ Connected as <span className="font-medium text-white">{session.user?.email}</span>
            </p>
            <button
              onClick={() => signOut()}
              className="text-sm text-red-400 underline"
            >
              Sign out
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-100 mb-2">Choose a repository:</h2>
            <Select
              onValueChange={(repo) => {
                setSelectedRepo(repo);
                toast.success(`Repository "${repo}" selected. Pulling files...`);
                fetchRelevantFiles(repo);
              }}
            >
              <SelectTrigger className="w-full bg-zinc-900 border-zinc-700 text-white overflow-y-scroll max-h-48">
                <SelectValue placeholder="-- Select a repository --" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 text-white max-h-64 overflow-y-auto">
                {repos.map((repo) => (
                  <SelectItem key={repo.id} value={repo.full_name} className="hover:bg-zinc-800">
                    ⭐ {repo.stargazers_count} – {repo.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {loading && <p className="text-blue-400 text-center">Fetching repository files...</p>}

          {!loading && tree.length > 0 && (
            <div className="mt-4 bg-zinc-900 p-6 rounded border border-zinc-700">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">File Tree:</h3>
              <p className="text-sm text-zinc-400 mb-4">
                ✅ Select files that describe the logic, APIs, and features. These will be used to generate documentation.
              </p>
              {renderTree(tree)}

              <div className="mt-6">
                <h4 className="font-medium text-gray-200 mb-2">Selected files:</h4>
                <ul className="text-sm text-gray-400 list-disc pl-6">
                  {[...selectedFiles].map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>

                {selectedFiles.size > 0 && (
                  <div className="mt-4">
                    <button
                      onClick={() => {
                        alert(`Generating docs for ${selectedFiles.size} files...`);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
                    >
                      🧠 Generate Documentation from Selected Files
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
