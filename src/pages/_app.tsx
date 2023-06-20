import { type AppType } from "next/dist/shared/lib/utils";
import "~/styles/globals.css";
import { ClerkProvider, UserButton } from "@clerk/nextjs";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-gray-100">
        <header>
          <UserButton afterSignOutUrl="/" />
        </header>
        <Component {...pageProps} />
      </div>
    </ClerkProvider>
  );
};

export default MyApp;
