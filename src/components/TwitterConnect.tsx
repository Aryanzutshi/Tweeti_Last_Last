'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TwitterConnect() {
  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const pathname = url.pathname;

    if (pathname === '/api/twitter/callback') {
      fetch(window.location.href)
        .then((res) => res.json())
        .then(async (data) => {
          const githubUsername = localStorage.getItem('githubUsername');

          if (!githubUsername) {
            console.error("❌ GitHub username missing");
            router.push('/');
            return;
          }

          const res = await fetch('/api/save-x-credentials', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              githubUsername,
              access_token: data.access_token,
              access_secret: data.access_secret,
            }),
          });

          if (res.ok) {
            console.log("✅ Saved X credentials");
          } else {
            console.error("❌ Failed to save X credentials");
          }

          router.push('/');
        })
        .catch((err) => {
          console.error("❌ Callback error:", err);
          router.push('/');
        });
    }
  }, [router]);

  return null;
}
