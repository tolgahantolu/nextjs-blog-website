import React from "react";
import Image from "next/image";

const Author = ({ author }) => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-gray-900 bg-opacity-75">
      <div className="absolute left-0 right-2 -top-14">
        <Image
          src={author.photo.url}
          alt={author.name}
          className="align-middle rounded-full object-top object-cover"
          width={100}
          height={100}
          unoptimized
        />
      </div>
      <h3 className="text-white my-4 text-xl font-semibold">{author.name}</h3>
      <p className="text-white text-lg">{author.bio}</p>
    </div>
  );
};

export default Author;
