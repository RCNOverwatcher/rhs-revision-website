import Head from "next/head";

const Home = () => {
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
      </div>
    </main>
  );
};

export default Home;
