import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import * as React from "react";

interface Material {
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
  const router = useRouter();
  const { subject } = router.query;
  const [materials, setMaterials] = useState<Material[]>([]);

  function getLabelByValue(value: string): string | undefined {
    const subject = subjects.find((subject) => subject.value === value);
    return subject ? subject.label : undefined;
  }
  const label = getLabelByValue(subject as string);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const data = await fetch(
          `/api/fetchMaterialsBySubject_alevel?subject=${subject as string}`,
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const material = await data.json();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setMaterials(material);
      } catch (error) {
        console.error("Error fetching materials:", error);
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
