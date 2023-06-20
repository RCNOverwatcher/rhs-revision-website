import { SignIn } from "@clerk/nextjs";
import Head from "next/head";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Sign in to your account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto py-20">
        <div className="mx-auto max-w-md bg-white p-1 shadow">
          <h1 className="mb-10 text-2xl font-bold">Sign In</h1>
          <SignIn />
        </div>
      </main>
    </div>
  );
}
