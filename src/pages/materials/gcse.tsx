import Link from "next/link";

const GCSEPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-white">GCSE Revision Resources</h1>
      <ul className="mt-4 space-y-2">
        <li>
          <Link
            href={"/materials/gcse/art"}
            className={"text-yellow-500 hover:underline"}
          >
            Art
          </Link>
        </li>
        <li>
          <Link
            href={"/materials/gcse/biology"}
            className={"text-yellow-500 hover:underline"}
          >
            Biology
          </Link>
        </li>
        <li>
          <Link
            href={"/materials/gcse/business"}
            className={"text-yellow-500 hover:underline"}
          >
            Business
          </Link>
        </li>
        <li>
          <Link
            href={"/materials/gcse/chemistry"}
            className={"text-yellow-500 hover:underline"}
          >
            Chemistry
          </Link>
        </li>
        <li>
          <Link
            href={"/materials/gcse/computer_science"}
            className={"text-yellow-500 hover:underline"}
          >
            Computer Science
          </Link>
        </li>
        <li>
          <Link
            href={"/materials/gcse/drama"}
            className={"text-yellow-500 hover:underline"}
          >
            Drama
          </Link>
        </li>
        <li>
          <Link
            href={"/materials/gcse/dt"}
            className={"text-yellow-500 hover:underline"}
          >
            DT
          </Link>
        </li>
        <li>
          <Link
            href={"/materials/gcse/engineering"}
            className={"text-yellow-500 hover:underline"}
          >
            Engineering
          </Link>
        </li>
        <li>
          <Link
            href={"/materials/gcse/english"}
            className={"text-yellow-500 hover:underline"}
          >
            English
          </Link>
        </li>
        <li>
          <Link
            href={"/materials/gcse/food_technology"}
            className={"text-yellow-500 hover:underline"}
          >
            Food Technology
          </Link>
        </li>
        <li>
          <Link
            href={"/materials/gcse/french"}
            className={"text-yellow-500 hover:underline"}
          >
            French
          </Link>
        </li>
        <li>
          <Link
            href={"/materials/gcse/geography"}
            className={"text-yellow-500 hover:underline"}
          >
            Geography
          </Link>
        </li>
        <li>
          <Link
            href={"/materials/gcse/geology"}
            className={"text-yellow-500 hover:underline"}
          >
            Geology
          </Link>
        </li>
        <li>
          <Link
            href={"/materials/gcse/german"}
            className={"text-yellow-500 hover:underline"}
          >
            German
          </Link>
        </li>
        <li>
          <Link
            href={"/materials/gcse/general"}
            className={"text-yellow-500 hover:underline"}
          >
            General
          </Link>
        </li>
        <li>
          <Link
            href={"/materials/gcse/history"}
            className={"text-yellow-500 hover:underline"}
          >
            History
          </Link>
        </li>
        <li>
          <Link
            href={"/materials/gcse/maths"}
            className={"text-yellow-500 hover:underline"}
          >
            Maths
          </Link>
        </li>
        <li>
          <Link
            href={"/materials/gcse/music"}
            className={"text-yellow-500 hover:underline"}
          >
            Music
          </Link>
        </li>
        <li>
          <Link
            href={"/materials/gcse/pe"}
            className={"text-yellow-500 hover:underline"}
          >
            PE
          </Link>
        </li>
        <li>
          <Link
            href={"/materials/gcse/physics"}
            className={"text-yellow-500 hover:underline"}
          >
            Physics
          </Link>
        </li>
        <li>
          <Link
            href={"/materials/gcse/re"}
            className={"text-yellow-500 hover:underline"}
          >
            RE
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default GCSEPage;
