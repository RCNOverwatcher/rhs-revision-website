import { SignIn } from "@clerk/nextjs";
import Head from "next/head";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0c1c47]">
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Sign in to your account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container py-20 ">
        <div className="mx-auto max-w-md p-1">
          <SignIn />
        </div>
      </main>
    </div>
  );
}
