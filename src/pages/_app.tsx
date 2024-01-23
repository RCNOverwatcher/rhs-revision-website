import { type AppType } from "next/dist/shared/lib/utils";
import "~/styles/globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "@uploadthing/react/styles.css";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "~/components/toaster";
import Image from "next/image";
import { Button } from "~/components/button";
import * as React from "react";
import {GeistSans} from "geist/font/sans";
import {cn} from "~/lib/utils";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#ae924a",
          colorText: "white",
          fontFamily: "Arial, sans-serif",
        },
      }}
    >
      <div className={cn("min-h-[100dvh] bg-[#0c1c47]", GeistSans.className)}>
        <nav className="flex items-center justify-between px-8 py-4 text-white">
          <div className="flex space-x-4">
            <Image
              alt="School Logo"
              className="h-10"
              height="40"
              src="/logo.png"
              width="40"
            />
            <ul className="flex space-x-4">
              <li>
                <Link className="hover:underline" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/materials">
                  Revision Materials
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/materials/gcse">
                  GCSE Revision Materials
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/materials/alevel">
                  A-Level Revision Materials
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex space-x-4">
            <SignedOut>
              <SignInButton>
                <Button className="bg-white text-[#0c1c47]">Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
        <hr className={"border-b-white"}/>
        <Component {...pageProps} />
        <Toaster />
        <Analytics />
      </div>
    </ClerkProvider>
  );
};

export default MyApp;
