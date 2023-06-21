import Link from "next/link";
const ALevelPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">A-Level Revision Resources</h1>
      <ul className="mt-4 space-y-2">
        <li>
          <Link
            href={`/subjects/alevel/art`}
            className={"text-blue-500 hover:underline"}
          >
            Art
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/biology`}
            className={"text-blue-500 hover:underline"}
          >
            Biology
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/business`}
            className={"text-blue-500 hover:underline"}
          >
            Business
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/chemistry`}
            className={"text-blue-500 hover:underline"}
          >
            Chemistry
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/computerscience`}
            className={"text-blue-500 hover:underline"}
          >
            Computer Science
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/drama`}
            className={"text-blue-500 hover:underline"}
          >
            Drama
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/dt`}
            className={"text-blue-500 hover:underline"}
          >
            DT
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/economics`}
            className={"text-blue-500 hover:underline"}
          >
            Economics
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/english`}
            className={"text-blue-500 hover:underline"}
          >
            English
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/french`}
            className={"text-blue-500 hover:underline"}
          >
            French
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/furthermaths`}
            className={"text-blue-500 hover:underline"}
          >
            Further Maths
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/geography`}
            className={"text-blue-500 hover:underline"}
          >
            Geography
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/geology`}
            className={"text-blue-500 hover:underline"}
          >
            Geology
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/german`}
            className={"text-blue-500 hover:underline"}
          >
            German
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/history`}
            className={"text-blue-500 hover:underline"}
          >
            History
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/maths`}
            className={"text-blue-500 hover:underline"}
          >
            Maths
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/mediastudies`}
            className={"text-blue-500 hover:underline"}
          >
            Media Studies
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/music`}
            className={"text-blue-500 hover:underline"}
          >
            Music
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/pe`}
            className={"text-blue-500 hover:underline"}
          >
            PE
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/physics`}
            className={"text-blue-500 hover:underline"}
          >
            Physics
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/politics`}
            className={"text-blue-500 hover:underline"}
          >
            Politics
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/productdesign`}
            className={"text-blue-500 hover:underline"}
          >
            Product Design
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/psychology`}
            className={"text-blue-500 hover:underline"}
          >
            Psychology
          </Link>
        </li>
        <li>
          <Link
            href={`/subjects/alevel/re`}
            className={"text-blue-500 hover:underline"}
          >
            RE
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ALevelPage;
