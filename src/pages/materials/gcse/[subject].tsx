import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "~/firebaseConfig";
import { useAuth } from "@clerk/nextjs";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import Link from "next/link";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;

const SubjectPage = () => {
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

  const router = useRouter();
  const { subject } = router.query;
  const [materials, setMaterials] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const q = query(
          collection(db, "materials"),
          where("selectedSubject", "==", subject),
          where("levelOfStudy", "==", "GCSE")
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMaterials(data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    if (subject) {
      fetchMaterials().catch((error) => {
        console.error("Error fetching materials:", error);
      });
    }
  }, [subject]);

  return (
    <div>
      <div className="container mx-auto py-8">
        <h1 className="mb-4 text-3xl font-bold">{subject}</h1>
        <div className="grid grid-cols-1 gap-4">
          {materials.map((material) => (
            <div key={material.id} className="bg-white p-4 shadow">
              <h3 className="mb-2 text-lg font-semibold">{material.name}</h3>
              <Link href={material.url} className="text-gray-600">
                {material.url}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
