import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "~/firebaseConfig";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { firebaseConfig } from "~/firebaseConfig";
import Link from "next/link";

initializeApp(firebaseConfig);

interface MaterialData {
  id: string;
  name: string;
  description: string;
  url: string;
  fileUrl: string;
  timestamp: number;
}

const Home = () => {
  const { getToken } = useAuth();
  const [materialArray, setMaterialArray] = useState<MaterialData[]>([]);

  useEffect(() => {
    const getMaterial = async () => {
      const auth = getAuth();
      const token = await getToken({ template: "integration_firebase" });

      try {
        if (!token) {
          return;
        }

        await signInWithCustomToken(auth, token);
        console.log("User signed in successfully:", auth.currentUser);

        const querySnapshot = await getDocs(
          query(collection(db, "materials"), orderBy("timestamp", "desc"))
        );
        const materials = querySnapshot.docs.map((doc) => {
          const data = doc.data() as MaterialData;
          return {
            ...data,
            id: doc.id,
          };
        });

        setMaterialArray(materials);
      } catch (error) {
        console.log("An error occurred:", error);
      }
    };

    getMaterial().catch((error) => {
      console.log("An error occurred:", error);
    });
  }, [getToken]);

  return (
    <div>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 gap-4">
          {materialArray.map((material) => (
            <div key={material.id} className="bg-white p-4 shadow">
              <h3 className="mb-2 text-lg font-semibold">{material.name}</h3>
              <p className="mb-2 text-gray-600">{material.description}</p>
              <Link href={material.url} className="text-gray-600">
                {material.url}
              </Link>
              {material.fileUrl && (
                <button className="mt-4 flex rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                  <Link href={material.fileUrl}>Download</Link>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
