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
        .then(res => res.json())
        .then(data => {
          console.log('✅ Twitter Auth Result:', data);

          // Store the authenticated user
          localStorage.setItem('twitterUser', JSON.stringify(data));

          // Redirect to homepage
          router.push('/');
        })
        .catch(err => {
          console.error('❌ Error handling Twitter callback:', err);
          router.push('/');
        });
    }
  }, [router]);

  const connectToTwitter = () => {
    window.location.href = '/api/twitter/auth';
  };

  return (
    <></>
  );
}
