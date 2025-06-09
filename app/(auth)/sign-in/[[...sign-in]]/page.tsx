'use client';
import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import Clerk's SignIn component to avoid SSR mismatches
const SignIn = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.SignIn),
  { ssr: false }
);

const SignInPage: React.FC = () => {
  // Determine redirect URL after sign-in
  const redirectUrl =
    typeof window !== 'undefined'
      ? window.location.origin + '/'
      : undefined;

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignIn redirectUrl={redirectUrl} />
    </main>
  );
};

export default SignInPage;
