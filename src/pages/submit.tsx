import Head from "next/head";
import { db } from "~/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialURL, setMaterialURL] = useState("");

  const { user } = useUser();
  const isTeacher =
    user?.primaryEmailAddress?.emailAddress &&
    user.primaryEmailAddress.emailAddress.endsWith("@richardhale.co.uk");

  if (!isTeacher) {
    console.log("User is not authorized to submit data.");
    return (
      <div className="min-h-screen bg-gray-100">
        <h1>Unauthorised</h1>
      </div>
    );
  }
  const saveMaterial = async () => {
    try {
      const docRef = await addDoc(collection(db, "materials"), {
        name: materialTitle,
        url: materialURL,
      });
      setMaterialTitle("");
      setMaterialURL("");
      console.log("Material saved successfully:", docRef.id);
    } catch (error) {
      console.error("Error saving material:", error);
    }

    return Promise.resolve();
  };
  const handleClick = () => {
    saveMaterial().catch((error) => {
      console.error("Error saving material:", error);
    });
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>RHS Revision Platform</title>
        <meta
          name="description"
          content="Richard Hale School Revision Platform"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto py-8">
        <div className="mx-auto max-w-md bg-white p-8 shadow">
          <input
            className="mb-4 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none"
            placeholder="Enter the Title.."
            value={materialTitle}
            onChange={(e) => setMaterialTitle(e.target.value)}
          />
          <input
            className="mb-4 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none"
            placeholder="Enter the URL.."
            value={materialURL}
            onChange={(e) => setMaterialURL(e.target.value)}
          />
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
            onClick={handleClick}
          >
            Click me to save
          </button>
        </div>
      </main>
    </div>
  );
}
