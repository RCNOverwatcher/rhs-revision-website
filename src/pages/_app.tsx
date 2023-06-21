import { type AppType } from "next/dist/shared/lib/utils";
import "~/styles/globals.css";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "@uploadthing/react/styles.css";

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
        </header>
        <Component {...pageProps} />
      </div>
    </ClerkProvider>
  );
};

export default MyApp;
