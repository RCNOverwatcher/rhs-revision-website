import Head from "next/head";
import { db } from "~/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { z } from "zod";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { UploadButton } from "~/lib/uploadthing";
import { cn } from "~/lib/utils";
import { Button } from "~/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/popover";

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
  const [materialDescription, setMaterialDescription] = useState("");
  const [materialURL, setMaterialURL] = useState("");
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [unauthorized, setUnauthorized] = useState(false);
  const [levelOfStudy, setLevelOfStudy] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("General");

  type Subject = {
    value: string;
    label: string;
  };

  const subjectsByLevelOfStudy: Record<string, Subject[]> = {
    All: [
      { value: "general", label: "General" },
      { value: "maths", label: "Maths" },
      { value: "science", label: "Science" },
      { value: "english", label: "English" },
      { value: "computerScience", label: "Computer Science" },
      { value: "history", label: "History" },
      { value: "geography", label: "Geography" },
      { value: "business", label: "Business" },
      { value: "psychology", label: "Psychology" },
      { value: "economics", label: "Economics" },
      { value: "politics", label: "Politics" },
      { value: "drama", label: "Drama" },
    ],
    GCSE: [
      { value: "art", label: "Art" },
      { value: "biology", label: "Biology" },
      { value: "business", label: "Business" },
      { value: "chemistry", label: "Chemistry" },
      { value: "computerScience", label: "Computer Science" },
      { value: "drama", label: "Drama" },
      { value: "dt", label: "DT" },
      { value: "engineering", label: "Engineering" },
      { value: "english", label: "English" },
      { value: "foodTechnology", label: "Food Technology" },
      { value: "french", label: "French" },
      { value: "geography", label: "Geography" },
      { value: "geology", label: "Geology" },
      { value: "german", label: "German" },
      { value: "general", label: "General" },
      { value: "history", label: "History" },
      { value: "maths", label: "Maths" },
      { value: "music", label: "Music" },
      { value: "pe", label: "PE" },
      { value: "physics", label: "Physics" },
      { value: "re", label: "RE" },
    ],
    ALevel: [
      { value: "general", label: "General" },
      { value: "art", label: "Art" },
      { value: "biology", label: "Biology" },
      { value: "business", label: "Business" },
      { value: "chemistry", label: "Chemistry" },
      { value: "computerScience", label: "Computer Science" },
      { value: "drama", label: "Drama" },
      { value: "economics", label: "Economics" },
      { value: "english", label: "English" },
      { value: "french", label: "French" },
      { value: "furtherMaths", label: "Further Maths" },
      { value: "geography", label: "Geography" },
      { value: "geology", label: "Geology" },
      { value: "german", label: "German" },
      { value: "history", label: "History" },
      { value: "maths", label: "Maths" },
      { value: "mediaStudies", label: "Media Studies" },
      { value: "music", label: "Music" },
      { value: "pe", label: "PE" },
      { value: "physics", label: "Physics" },
      { value: "politics", label: "Politics" },
      { value: "productDesign", label: "Product Design" },
      { value: "psychology", label: "Psychology" },
      { value: "re", label: "RE" },
      { value: "btecSportStudies", label: "BTEC Sport Studies" },
      { value: "btecBusinessStudies", label: "BTEC Business Studies" },
      { value: "btecScience", label: "BTEC Science" },
    ],
  };
  interface FileResponse {
    fileUrl: string;
    fileKey: string;
  }

  const handleApiResponse = (response: FileResponse[] | undefined) => {
    if (response) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setFileUrl(response[0].fileUrl);
    } else {
      setFileUrl(undefined);
    }
  };

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { user } = useUser();

  const saveMaterial = async () => {
    try {
      const docRef = await addDoc(collection(db, "materials"), {
        name: z.string().parse(materialTitle),
        description: z.string().parse(materialDescription),
        url: z.string().parse(materialURL) || "",
        levelOfStudy: z.string().parse(levelOfStudy),
        selectedSubject: z.string().parse(selectedSubject),
        fileUrl: z.string().url().optional().parse(fileUrl) || "",
        timestamp: new Date(),
      });
      setMaterialTitle("");
      setMaterialDescription("");
      setMaterialURL("");
      setFileUrl("");
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
      console.log("User is not authorized to submit new materials.");
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
            <textarea
              className="mb-4 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none"
              placeholder="Enter the Description.."
              value={materialDescription}
              onChange={(e) => setMaterialDescription(e.target.value)}
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
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between "
                >
                  {value
                    ? subjectsByLevelOfStudy[levelOfStudy]?.find(
                        (subject) => subject.value === value
                      )?.label || "Select subject..."
                    : "Select subject..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] border-b-black p-0">
                <Command>
                  <CommandInput
                    placeholder="Search subject..."
                    className={"rounded"}
                  />
                  <CommandEmpty>No subject found.</CommandEmpty>
                  <CommandGroup className={"rounded-2xl"}>
                    {subjectsByLevelOfStudy[levelOfStudy]?.map((subject) => (
                      <CommandItem
                        key={subject.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                          setSelectedSubject(currentValue);
                        }}
                        className={" bg-gray-200"}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === subject.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {subject.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
              onClick={handleClick}
            >
              Click me to save
            </button>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                handleApiResponse(res);
                console.log("Files: ", res);
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Submit;

// Path: src\pages\subjects\index.tsx
