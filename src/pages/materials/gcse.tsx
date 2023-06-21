import Link from "next/link";

const GCSEPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">GCSE Revision Resources</h1>
      <ul className="mt-4 space-y-2">
        <li>
          <Link
            href={"/subjects/gcse/art"}
            className={"text-blue-500 hover:underline"}
          >
            Art
          </Link>
        </li>
        <li>
          <Link
            href={"/subjects/gcse/biology"}
            className={"text-blue-500 hover:underline"}
          >
            Biology
          </Link>
        </li>
        <li>
          <Link
            href={"/subjects/gcse/business"}
            className={"text-blue-500 hover:underline"}
          >
            Business
          </Link>
        </li>
        <li>
          <Link
            href={"/subjects/gcse/chemistry"}
            className={"text-blue-500 hover:underline"}
          >
            Chemistry
          </Link>
        </li>
        <li>
          <Link
            href={"/subjects/gcse/computerscience"}
            className={"text-blue-500 hover:underline"}
          >
            Computer Science
          </Link>
        </li>
        <li>
          <Link
            href={"/subjects/gcse/drama"}
            className={"text-blue-500 hover:underline"}
          >
            Drama
          </Link>
        </li>
        <li>
          <Link
            href={"/subjects/gcse/dt"}
            className={"text-blue-500 hover:underline"}
          >
            DT
          </Link>
        </li>
        <li>
          <Link
            href={"/subjects/gcse/engineering"}
            className={"text-blue-500 hover:underline"}
          >
            Engineering
          </Link>
        </li>
        <li>
          <Link
            href={"/subjects/gcse/english"}
            className={"text-blue-500 hover:underline"}
          >
            English
          </Link>
        </li>
        <li>
          <Link
            href={"/subjects/gcse/foodTechnology"}
            className={"text-blue-500 hover:underline"}
          >
            Food Technology
          </Link>
        </li>
        <li>
          <Link
            href={"/subjects/gcse/french"}
            className={"text-blue-500 hover:underline"}
          >
            French
          </Link>
        </li>
        <li>
          <Link
            href={"/subjects/gcse/geography"}
            className={"text-blue-500 hover:underline"}
          >
            Geography
          </Link>
        </li>
        <li>
          <Link
            href={"/subjects/gcse/geology"}
            className={"text-blue-500 hover:underline"}
          >
            Geology
          </Link>
        </li>
        <li>
          <Link
            href={"/subjects/gcse/german"}
            className={"text-blue-500 hover:underline"}
          >
            German
          </Link>
        </li>
        <li>
          <Link
            href={"/subjects/gcse/general"}
            className={"text-blue-500 hover:underline"}
          >
            General
          </Link>
        </li>
        <li>
          <Link
            href={"/subjects/gcse/history"}
            className={"text-blue-500 hover:underline"}
          >
            History
          </Link>
        </li>
        <li>
          <Link
            href={"/subjects/gcse/maths"}
            className={"text-blue-500 hover:underline"}
          >
            Maths
          </Link>
        </li>
        <li>
          <Link
            href={"/subjects/gcse/music"}
            className={"text-blue-500 hover:underline"}
          >
            Music
          </Link>
        </li>
        <li>
          <Link
            href={"/subjects/gcse/pe"}
            className={"text-blue-500 hover:underline"}
          >
            PE
          </Link>
        </li>
        <li>
          <Link
            href={"/subjects/gcse/physics"}
            className={"text-blue-500 hover:underline"}
          >
            Physics
          </Link>
        </li>
        <li>
          <Link
            href={"/subjects/gcse/re"}
            className={"text-blue-500 hover:underline"}
          >
            RE
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default GCSEPage;
