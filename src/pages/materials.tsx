import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Toggle } from "~/components/ui/toggle";
import { useUser } from "@clerk/nextjs";

interface MaterialData {
  materialID: number;
  title: string;
  description: string;
  url: string;
  file_url: string;
  date_uploaded: string;
}

const Home = () => {
  const { user } = useUser();

  const [materialArray, setMaterialArray] = useState<MaterialData[]>([]);
  const [favoriteMaterials, setFavoriteMaterials] = useState<number[]>([]);
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

    const fetchFavorites = async () => {
      try {
        const data = await fetch(`/api/fetchFavourites?userID=${user?.id}`);
        const favorites = (await data.json()) as number[];
        setFavoriteMaterials(favorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    if (user?.id) {
      fetchFavorites().catch((error) => {
        console.error("Error fetching favorites:", error);
      });
    }
  }, [user?.id]);

  const isMaterialFavourited = (materialID: number) => {
    return favoriteMaterials.includes(materialID);
  };

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
          {materialArray &&
            materialArray.length > 0 &&
            materialArray.map((material) => (
              <div
                key={material.materialID}
                className="bg-white px-4 py-10 shadow"
              >
                <Toggle
                  aria-label="Toggle favorite"
                  variant="outline"
                  className={"float-right"}
                  pressed={isMaterialFavourited(material.materialID)}
                  onPressedChange={(pressed) => {
                    const favoritesCopy = [...favoriteMaterials];
                    if (pressed) {
                      favoritesCopy.push(material.materialID);
                      setFavoriteMaterials(favoritesCopy);

                      fetch(
                        `/api/addFavourite?userID=${user?.id}&favourite=${material.materialID}`,
                      ).catch((error) => {
                        console.error("Error adding favorite:", error);
                      });
                    } else {
                      const index = favoritesCopy.indexOf(material.materialID);
                      if (index !== -1) {
                        favoritesCopy.splice(index, 1);
                        setFavoriteMaterials(favoritesCopy);

                        fetch(
                          `/api/removeFavourite?userID=${user?.id}&favourite=${material.materialID}`,
                        ).catch((error) => {
                          console.error("Error removing favorite:", error);
                        });
                      }
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
            ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
