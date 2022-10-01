import React, { useContext } from "react";
import Link from "next/link";

const categories = [
  { name: "React", slug: "react" },
  { name: "Redux", slug: "redux" },
  { name: "Web Development", slug: "webdev" },
];

const Header = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b border-blue-400 w-full inline-block py-8">
        {/* header logo section */}
        <div className="md:float-left block">
          <Link href="/">
            <span className="ursor-pointer font-bold text-4xl text-white">
              Tolgahan's Blog
            </span>
          </Link>
        </div>

        {/* header categories section */}
        <div className="hidden md:float-left md:contents">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className="cursor-pointer mt-3 align-middle text-white font-semibold ml-5 md:float-right">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
