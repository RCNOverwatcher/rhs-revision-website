import Head from "next/head";
import { db } from "~/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { z } from "zod";

const urlSchema = z.string().url();

const Submit = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const signInWithClerk = async () => {
      const auth = getAuth();

      try {
        const token = await getToken({ template: "integration_firebase" });
        if (!token) {
          return;
        }
        const userCredentials = await signInWithCustomToken(auth, token);
        console.log("User signed in successfully:", userCredentials.user);
      } catch (error) {
        console.log("An error occurred:", error);
      }
    };

    signInWithClerk().catch((error) => {
      console.log("An error occurred:", error);
    });
  }, [getToken]);

  const [materialTitle, setMaterialTitle] = useState("");
  const [materialURL, setMaterialURL] = useState("");
  const [unauthorized, setUnauthorized] = useState(false);
  const [levelOfStudy, setLevelOfStudy] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("General");

  const subjectsByLevelOfStudy: Record<string, string[]> = {
    All: [
      "General",
      "Maths",
      "Science",
      "English",
      "Computer Science",
      "History",
      "Geography",
      "Business",
      "Psychology",
      "Economics",
      "Politics",
      "Drama",
    ],
    GCSE: [
      "General",
      "Maths",
      "Science",
      "English",
      "Computer Science",
      "History",
      "Geography",
    ],
    ALevel: [
      "General",
      "Maths",
      "Science",
      "English",
      "Computer Science",
      "Psychology",
      "Economics",
      "Politics",
      "Drama",
    ],
  };
  const availableSubjects = subjectsByLevelOfStudy[levelOfStudy] ?? [];

  const { user } = useUser();
  const saveMaterial = async () => {
    try {
      const docRef = await addDoc(collection(db, "materials"), {
        name: materialTitle,
        url: urlSchema.parse(materialURL),
        subject: selectedSubject,
      });
      setMaterialTitle("");
      setMaterialURL("");
      console.log("Material saved successfully:", docRef.id);
    } catch (error) {
      console.error("Error saving material:", error);
    }
  };

  const handleClick = () => {
    const isTeacher =
      user?.primaryEmailAddress?.emailAddress &&
      user.primaryEmailAddress.emailAddress.endsWith("@richardhale.co.uk");

    if (!isTeacher) {
      console.log(user?.primaryEmailAddress?.emailAddress);
      console.log("User is not authorized to submit data.");
      setUnauthorized(true);
      return;
    }

    saveMaterial().catch((error) => {
      console.error("Error saving material:", error);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>RHS Revision Platform - Submit</title>
        <meta
          name="description"
          content="Richard Hale School Revision Platform - Submit"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto py-8">
        {unauthorized ? (
          <div className="mx-auto max-w-md bg-white p-8 shadow">
            <h1 className="text-5xl text-neutral-600">
              Unauthorised. You are not a teacher.
            </h1>
          </div>
        ) : (
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
            <select
              className="mb-4 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none"
              value={levelOfStudy}
              onChange={(e) => setLevelOfStudy(e.target.value)}
            >
              <option value="All">All</option>
              <option value="GCSE">GCSE</option>
              <option value="ALevel">A-Level</option>
            </select>
            <select
              className="mb-4 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {availableSubjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
              onClick={handleClick}
            >
              Click me to save
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Submit;

// Path: src\pages\subjects\index.tsx
