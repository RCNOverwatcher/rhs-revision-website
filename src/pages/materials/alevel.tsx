import Link from "next/link";
const ALevelPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-white">
        A-Level Revision Resources
      </h1>
      <ul className="mt-4 space-y-2">
        <li>
          <Link
            href={`/materials/alevel/art`}
            className={"text-yellow-500 hover:underline"}
          >
            Art
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/biology`}
            className={"text-yellow-500 hover:underline"}
          >
            Biology
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/business`}
            className={"text-yellow-500 hover:underline"}
          >
            Business
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/chemistry`}
            className={"text-yellow-500 hover:underline"}
          >
            Chemistry
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/computer_science`}
            className={"text-yellow-500 hover:underline"}
          >
            Computer Science
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/drama`}
            className={"text-yellow-500 hover:underline"}
          >
            Drama
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/dt`}
            className={"text-yellow-500 hover:underline"}
          >
            DT
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/economics`}
            className={"text-yellow-500 hover:underline"}
          >
            Economics
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/english`}
            className={"text-yellow-500 hover:underline"}
          >
            English
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/french`}
            className={"text-yellow-500 hover:underline"}
          >
            French
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/further_maths`}
            className={"text-yellow-500 hover:underline"}
          >
            Further Maths
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/geography`}
            className={"text-yellow-500 hover:underline"}
          >
            Geography
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/geology`}
            className={"text-yellow-500 hover:underline"}
          >
            Geology
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/german`}
            className={"text-yellow-500 hover:underline"}
          >
            German
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/history`}
            className={"text-yellow-500 hover:underline"}
          >
            History
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/maths`}
            className={"text-yellow-500 hover:underline"}
          >
            Maths
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/media_studies`}
            className={"text-yellow-500 hover:underline"}
          >
            Media Studies
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/music`}
            className={"text-yellow-500 hover:underline"}
          >
            Music
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/pe`}
            className={"text-yellow-500 hover:underline"}
          >
            PE
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/physics`}
            className={"text-yellow-500 hover:underline"}
          >
            Physics
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/politics`}
            className={"text-yellow-500 hover:underline"}
          >
            Politics
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/product_design`}
            className={"text-yellow-500 hover:underline"}
          >
            Product Design
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/psychology`}
            className={"text-yellow-500 hover:underline"}
          >
            Psychology
          </Link>
        </li>
        <li>
          <Link
            href={`/materials/alevel/re`}
            className={"text-yellow-500 hover:underline"}
          >
            RE
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ALevelPage;
