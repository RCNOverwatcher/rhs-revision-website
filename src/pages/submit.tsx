import Head from "next/head";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import * as React from "react";
import { z } from "zod";
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
import { useToast } from "~/components/use-toast";

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
    { value: "computer_science", label: "Computer Science" },
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
    { value: "computer_science", label: "Computer Science" },
    { value: "drama", label: "Drama" },
    { value: "dt", label: "DT" },
    { value: "engineering", label: "Engineering" },
    { value: "english", label: "English" },
    { value: "food_technology", label: "Food Technology" },
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
    { value: "computer_science", label: "Computer Science" },
    { value: "drama", label: "Drama" },
    { value: "economics", label: "Economics" },
    { value: "english", label: "English" },
    { value: "french", label: "French" },
    { value: "further_maths", label: "Further Maths" },
    { value: "geography", label: "Geography" },
    { value: "geology", label: "Geology" },
    { value: "german", label: "German" },
    { value: "history", label: "History" },
    { value: "maths", label: "Maths" },
    { value: "media_studies", label: "Media Studies" },
    { value: "music", label: "Music" },
    { value: "pe", label: "PE" },
    { value: "physics", label: "Physics" },
    { value: "politics", label: "Politics" },
    { value: "product_design", label: "Product Design" },
    { value: "psychology", label: "Psychology" },
    { value: "re", label: "RE" },
    { value: "btec_sport", label: "BTEC Sport Studies" },
    { value: "btec_business", label: "BTEC Business Studies" },
    { value: "btec_science", label: "BTEC Science" },
  ],
};

const Submit = () => {
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialDescription, setMaterialDescription] = useState("");
  const [materialURL, setMaterialURL] = useState("");
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [fileKey, setFileKey] = useState<string | undefined>(undefined);
  const [unauthorized, setUnauthorized] = useState(false);
  const [levelOfStudy, setLevelOfStudy] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("general");

  interface FileResponse {
    url: string;
    key: string;
  }

  const { toast } = useToast();

  const handleApiResponse = (response: FileResponse[] | undefined) => {
    if (response) {
      // @ts-expect-error idk
      setFileUrl(response[0].url);
      // @ts-expect-error idk
      setFileKey(response[0].key);
    } else {
      setFileUrl(undefined);
    }
  };

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { user } = useUser();

  const schema = z.object({
    title: z.string().min(5).max(100),
    description: z.string().optional(),
    url: z.string().optional(),
    level_of_study: z.string(),
    subject: z.string(),
    file_key: z.string().optional(),
    file_url: z.string().optional(),
    date_uploaded: z.date(),
  });

  const saveMaterial = async () => {
    try {
      schema.parse({
        title: materialTitle,
        description: materialDescription,
        url: materialURL,
        level_of_study: levelOfStudy,
        subject: selectedSubject,
        file_key: fileKey,
        file_url: fileUrl,
        date_uploaded: new Date(),
      });
      await fetch(`/api/submitMaterials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: materialTitle,
          description: materialDescription,
          url: materialURL,
          level_of_study: levelOfStudy,
          subject: selectedSubject,
          file_key: fileKey,
          file_url: fileUrl,
          date_uploaded: new Date(),
        }),
      });
      setMaterialTitle("");
      setMaterialDescription("");
      setMaterialURL("");
      setFileUrl("");
      setFileKey("");
      console.log("Material saved successfully");
      toast({
        title: "Material saved successfully.",
        description: "Your material has been saved.",
        className: "bg-green-400",
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to save material.",
        variant: "destructive",
      });
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
    <div className="min-h-screen bg-[#0c1c47]">
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
          <div className="mx-auto max-w-2xl rounded-2xl bg-blue-500 px-10 py-16 shadow">
            <h1 className="mb-4 text-center text-4xl font-bold text-white">
              Submit Materials
            </h1>
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
                  className="w-[200px] justify-between bg-white"
                >
                  {value
                    ? subjectsByLevelOfStudy[levelOfStudy]?.find(
                        (subject) => subject.value === value,
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
                        value={subject.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                          setSelectedSubject(currentValue);
                        }}
                        className={"bg-gray-200"}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === subject.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {subject.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                handleApiResponse(res);
              }}
              onUploadError={(error: Error) => {
                toast({
                  title: "An error occurred.",
                  description: "Unable to upload file.",
                });
                console.error("Error uploading file:", error);
              }}
            />
            <Button
              className="float-right rounded bg-blue-500 px-4 py-5 text-white hover:bg-blue-600 focus:outline-none "
              onClick={handleClick}
            >
              Save and Upload Material
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Submit;
