import { collection, getDocs } from "firebase/firestore";
import { db } from "~/firebaseConfig";
import { useState, useEffect } from "react";
const dbInstance = collection(db, "materials");

export default function Home() {
  interface MaterialData {
    id: string;
    name: string;
    url: string;
  }

  const [materialArray, setMaterialArray] = useState<MaterialData[]>([]);

  const getMaterial = () => {
    void getDocs(dbInstance).then((data) => {
      const materials = data.docs.map((item) => {
        return {
          ...(item.data() as MaterialData),
        };
      });
      setMaterialArray(materials);
    });
  };

  useEffect(() => {
    getMaterial();
  });

  return (
    <div>
      <div className="container mx-auto py-8">
        <h1 className="mb-4 text-3xl font-bold">Home Page</h1>
        <div className="grid grid-cols-1 gap-4">
          {materialArray.map((material) => (
            <div key={material.id} className="bg-white p-4 shadow">
              <h3 className="mb-2 text-lg font-semibold">{material.name}</h3>
              <p className="text-gray-600">{material.url}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
