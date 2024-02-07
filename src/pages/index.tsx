import Head from "next/head";
import type { GetStaticProps } from "next";
import Countdown from "react-countdown";

interface Exams {
  exam_id: number;
  exam_title: string;
  exam_date: Date;
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
          <div className={"container mx-auto"}>
            <div className={"grid grid-cols-1 sm:grid-cols-3 gap-4"}>
          {exams.length > 0 &&
            exams.map((exam: Exams) => (
              <div
                key={exam.exam_id}
                className={"relative flex h-full flex-col rounded-md border border-gray-200 bg-white p-2.5 hover:border-gray-400 sm:rounded-lg sm:p-5"}
              >
                  <h3 className="text-md mb-0 font-semibold text-gray-900 hover:text-black sm:mb-1.5 sm:text-xl">
                    {exam.exam_title}
                  </h3>
                  <p className="text-sm leading-normal text-gray-400 sm:block">
                    <Countdown date={exam.exam_date} />, {exam.exam_time}{" "}
                    {exam.exam_duration} {exam.exam_subject} {exam.exam_level}
                  </p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (_context) => {
  const res = await fetch("https://revision.rcn.sh/api/fetchExams");
  const exams = (await res.json()) as Exams[];

  return {
    props: {
      exams,
    },
  };
};

export default Home;
