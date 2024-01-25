import Head from "next/head";
import type {GetServerSideProps} from "next";
import type {DateTime} from "asn1js";

type Exams = {
    exam_id: number;
    exam_title: string;
    exam_date: DateTime;
    exam_time: string;
    exam_duration: number;
    exam_subject: string;
    exam_level: string;
}

interface PageProps {
    exams: Exams[];
}

function Home({ exams }: PageProps) {
    return (
    <main>
      <Head>
        <title>RHS Revision Platform</title>
        <meta
          name="description"
          content="Richard Hale School Revision Platform"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-[#0c1c47]">
        <div className="py-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">WELCOME TO THE</h1>
          <h2 className="text-6xl font-bold text-[#ffc423]">
            RICHARD HALE SCHOOL
          </h2>
          <p className="mt-4 text-lg text-white">REVISION PLATFORM</p>
        </div>
          {exams.length === 0 && (
          exams.map((exam: Exams) => (
            <div key={exam.exam_id} className="bg-white p-4 shadow">
                <h3 className="mb-2 text-lg font-semibold text-white">
                    {exam.exam_title}
                </h3>
                <p className="text-sm text-gray-500">
                    {exam.exam_date as unknown as string} {exam.exam_time} {exam.exam_duration} {exam.exam_subject} {exam.exam_level}
                </p>
            </div>
            )))}
      </div>
    </main>
  );
}

export const getServerSideProps : GetServerSideProps = async () => {
    const res = await fetch("https://revision.rcn.sh/api/fetchExams");
    const exams = await res.json() as Exams;
    console.log(exams);

    return {
    props: {
        exams,
    },
  };
}

export default Home;
