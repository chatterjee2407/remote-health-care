'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

// Dynamically load Clerk’s SignIn so there’s zero SSR mismatch
const SignIn = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.SignIn),
  { ssr: false }
);

const SignInPage: React.FC = () => {
  const [redirectUrl, setRedirectUrl] = useState<string>();

  // Only run in the browser
  useEffect(() => {
    setRedirectUrl(window.location.origin + '/');
  }, []);

  // Avoid rendering until we know the origin
  if (!redirectUrl) return null;

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignIn
        // force Clerk to send you home on whatever origin you’re on
        redirectUrl={redirectUrl}
      />
    </main>
  );
};

export default SignInPage;
