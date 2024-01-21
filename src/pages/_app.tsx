import { type AppType } from "next/dist/shared/lib/utils";
import "~/styles/globals.css";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "@uploadthing/react/styles.css";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "~/components/toaster";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#ae924a",
          colorText: "white",
        },
      }}
    >
      <div className="min-h-screen bg-gray-100">
        <header>
          <UserButton />
          <div className="mb-8 flex flex-col items-center justify-between">
            <h1 className="text-3xl font-bold">RHS Revision</h1>
            <nav className="flex space-x-4 text-2xl">
              <Link href="/">Home</Link>
              <br />
              <Link href="/materials">Materials</Link>
              <br />
              <Link href="/materials/gcse">GCSE Resources</Link>
              <br />
              <Link href="/materials/alevel">A-Level Resources</Link>
              <br />
              <Link href="/submit">Submit Resources</Link>
            </nav>
          </div>
        </header>
        <Component {...pageProps} />
        <Toaster />
        <Analytics />
      </div>
    </ClerkProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default MyApp;
