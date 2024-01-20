import { useEffect, useState } from "react";
import Link from "next/link";

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
    <div>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 gap-4">
          {materialArray && materialArray.length > 0 ? (
            materialArray.map((material) => (
              <div key={material.material_id} className="">
                <h3 className="mb-2 text-lg font-semibold">{material.title}</h3>
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
            <p>Loading materials...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
