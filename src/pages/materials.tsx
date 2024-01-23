import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import * as React from "react";

interface MaterialData {
  material_id: number;
  title: string;
  description: string;
  url: string;
  file_url: string;
  date_uploaded: string;
}

const Home = () => {
  const [materialArray, setMaterialArray] = useState<MaterialData[]>([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const data = await fetch(`/api/fetchMaterials`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const material = await data.json();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setMaterialArray(material);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials().catch((error) => {
      console.error("Error fetching materials:", error);
    });
  }, []);

  return (
    <main>
      <Head>
        <title>RHS Revision Platform - Materials</title>
        <meta
          name="description"
          content="Richard Hale School Revision Platform - Materials"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto py-8">
        <h1 className="mb-4 text-4xl font-bold text-white">
          Revision Materials
        </h1>
        <div className="grid grid-cols-1 gap-4">
          {materialArray && materialArray.length > 0 ? (
            materialArray.map((material) => (
              <div
                key={material.material_id}
                className="bg-white px-4 py-10 shadow"
              >
                <h3 className="mb-2 text-2xl font-semibold">
                  {material.title}
                </h3>
                <p className="mb-2 text-gray-600">{material.description}</p>
                {material.url && (
                  <Link href={material.url} className="text-gray-600">
                    {material.url}
                  </Link>
                )}
                {material.file_url && (
                  <button className="mt-4 flex rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                    <Link href={material.file_url}>Download</Link>
                  </button>
                )}
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
