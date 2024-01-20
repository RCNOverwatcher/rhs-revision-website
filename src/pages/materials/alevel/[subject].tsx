import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "~/firebaseConfig";
import { useAuth } from "@clerk/nextjs";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import Link from "next/link";

interface Material {
  id: string;
  name: string;
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
    value: "computerScience",
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
    value: "furtherMaths",
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
    value: "mediaStudies",
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
    value: "productDesign",
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
    value: "btecSportStudies",
    label: "BTEC Sport Studies",
  },
  {
    value: "btecBusinessStudies",
    label: "BTEC Business Studies",
  },
  {
    value: "btecScience",
    label: "BTEC Science",
  },
];

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
  const [materials, setMaterials] = useState<Material[]>([]);

  const item = subjects.find((item) => item.value === subject);
  const label = item ? item.label : "";

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const q = query(
          collection(db, "materials"),
          where("selectedSubject", "==", subject),
          where("levelOfStudy", "==", "ALevel"),
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name as string,
          url: doc.data().url as string,
          fileUrl: doc.data().fileUrl as string,
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
        <h1 className="mb-4 text-3xl font-bold">{label}</h1>
        <div className="grid grid-cols-1 gap-4">
          {materials.map((material: Material) => (
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
