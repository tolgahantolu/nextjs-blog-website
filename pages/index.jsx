import Head from "next/head";
import Image from "next/image";
import {
  PostCard,
  Categories,
  PostWidget,
  Header,
} from "../components/exports";

import { getPosts } from "../services/index";

//const posts = [
//  {
//    title: "What is the useEffect Hook?",
//    excerpt: "useEffect is a React Hook!",
//  },
//  {
//    title: "React with Tailwindcss and GraphQL",
//    excerpt: "GraphQL | Tailwindcss | React - Blog App",
//  },
//];

const Home = ({ posts }) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Tolgahan's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post) => (
            <PostCard post={post.node} key={post.title} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: {
      posts,
    },
  };
}
