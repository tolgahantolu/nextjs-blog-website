import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from "../services";

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);

  console.log(relatedPosts);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Post" : "Recent Post"}
      </h3>
      {relatedPosts.map((post) => {
        return (
          <div key={post.title} className="flex item-center w-full mb-4">
            <div className="w-16 flex-none">
              <img
                src={post.featuredImage.url}
                alt={post.title}
                className="w-16 h-16 rounded-full object-cover align-middle"
              />
            </div>
            <div className="flex-grow ml-4 mt-2">
              <p className="text-gray-500 font-xs">
                {moment(post.createdAt).format("MMM DD, YYYY")}
              </p>
              {/*link'lere key verilmezse hata döner*/}
              <Link
                href={`/post/${post.slug}`}
                className="text-md "
                key={post.title}
              >
                {post.title}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostWidget;
