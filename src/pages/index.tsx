import Link from "next/link";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import * as React from "react";
function UserStatus() {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    return <SignOutButton>Sign out</SignOutButton>;
  }
  return <SignInButton>Sign in</SignInButton>;
}

const Home = () => {
  return (
    <main>
      <Head>
        <title>RHS Revision Platform</title>
        <meta
          name="description"
          content="Richard Hale School Revision Platform"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen items-center justify-center bg-gray-200">
        <div className="rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-4 text-3xl font-bold">
            Welcome to the RHS Revision Portal!
          </h1>
          <p className="mb-8 text-lg text-gray-700">
            Start revising and ace your exams!
          </p>
          <div className="flex justify-between">
            <UserStatus />
            <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
              <Link href={"/materials"}>View Materials</Link>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
