import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import * as React from "react";
import {Toggle} from "~/components/ui/toggle";
import {useUser} from "@clerk/nextjs";
import {useToast} from "~/components/use-toast";


interface Material {
  materialID: number;
  title: string;
  description: string;
  url: string;
  fileUrl: string;
}

const subjects = [
  {
    value: "general",
    label: "General",
  },
  {
    value: "art",
    label: "Art",
  },
  {
    value: "biology",
    label: "Biology",
  },
  {
    value: "business",
    label: "Business",
  },
  {
    value: "chemistry",
    label: "Chemistry",
  },
  {
    value: "computer_science",
    label: "Computer Science",
  },
  {
    value: "drama",
    label: "Drama",
  },
  {
    value: "economics",
    label: "Economics",
  },
  {
    value: "english",
    label: "English",
  },
  {
    value: "french",
    label: "French",
  },
  {
    value: "further_maths",
    label: "Further Maths",
  },
  {
    value: "geography",
    label: "Geography",
  },
  {
    value: "geology",
    label: "Geology",
  },
  {
    value: "german",
    label: "German",
  },
  {
    value: "history",
    label: "History",
  },
  {
    value: "maths",
    label: "Maths",
  },
  {
    value: "media_studies",
    label: "Media Studies",
  },
  {
    value: "music",
    label: "Music",
  },
  {
    value: "pe",
    label: "PE",
  },
  {
    value: "physics",
    label: "Physics",
  },
  {
    value: "politics",
    label: "Politics",
  },
  {
    value: "product_design",
    label: "Product Design",
  },
  {
    value: "psychology",
    label: "Psychology",
  },
  {
    value: "re",
    label: "RE",
  },
  {
    value: "btec_sport",
    label: "BTEC Sport",
  },
  {
    value: "btec_business",
    label: "BTEC Business ",
  },
  {
    value: "btec_science",
    label: "BTEC Science",
  },
];

const SubjectPage = () => {
  const {user} = useUser();
  const { subject } = useRouter().query;
  const { toast } = useToast();

  const [materials, setMaterials] = useState<Material[]>([]);

  function getLabelByValue(value: string): string | undefined {
    const subject = subjects.find((subject) => subject.value === value);
    return subject ? subject.label : undefined;
  }
  const label = getLabelByValue(subject as string);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        if (subject === undefined) {
          return;
        }
        const data = await fetch(
          `/api/fetchMaterialsBySubject_alevel?subject=${subject as string}`,
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const material = await data.json();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setMaterials(material);
      } catch (error) {
        console.error("Error fetching materials:", error);
        toast({
          title: "Error fetching materials",
          description: "An unknown error occurred while fetching materials. Please try again later.",
          className: "bg-red-500",
        })
      }
    };

    fetchMaterials().catch((error) => {
      console.error("Error fetching materials:", error);
    });
  }, [subject]);

  return (
    <main>
      <Head>
        <title>RHS Revision Platform - A-Level Materials</title>
        <meta
          name="description"
          content="Richard Hale School Revision Platform - A-Level Materials"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto py-8">
        <h1 className="mb-4 text-3xl font-bold text-white">{label}</h1>
        <div className="grid grid-cols-1 gap-4">
          {materials.length === 0 && (
            <div className="p-4 shadow">
              <h3 className="mb-2 text-lg font-semibold text-white">
                No materials available yet
              </h3>
            </div>
          )}
          {materials.map((material: Material) => (
            <div key={material.title} className="bg-white p-4 shadow">
              <Toggle
                  aria-label="Toggle favorite"
                  variant="outline"
                  className={"float-right"}
                  onPressedChange={(pressed) => {
                    if (pressed) {
                      fetch(`/api/addFavourite?userID=${user?.id}&favourite=${material.materialID as unknown as string}`, {
                      }).catch((error) => {
                        console.error("Error adding favorite:", error);
                        toast({
                          title: "Error adding favourite",
                          description: "An unknown error occurred while adding a favourite. Please try again later.",
                          className: "bg-red-500",
                        })
                      });
                    } else if (!pressed) {
                      fetch(`/api/removeFavourite?userID=${user?.id}&favourite=${material.materialID}`, {
                      }).catch((error) => {
                        console.error("Error removing favourite:", error);
                        toast({
                          title: "Error adding favourite",
                          description: "An unknown error occurred while adding a favourite. Please try again later.",
                          className: "bg-red-500",
                        })
                      });
                    }
                  }}
              >
                <svg
                    className={"h-4 w-4"}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#d4af37"
                    stroke="#d4af37"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span className="sr-only">Toggle favorite</span>
              </Toggle>
              <h3 className="mb-2 text-lg font-semibold">{material.title}</h3>
              <p className="mb-2 text-gray-600">{material.description}</p>
              <Link href={material.url} className="text-gray-600">
                {material.url}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SubjectPage;
