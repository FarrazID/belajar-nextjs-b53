import dynamic from "next/dynamic";
import Link from "next/link";

//! Using dynamic import (use wrapper: 'LayoutComponent')
const LayoutComponent = dynamic(() => import('@/layout'));

export default function Notes({ posts }) {
  console.log("data posts => ", posts);
  return (
    <>
      <LayoutComponent metaTitle="Posts">
        {/* TEST: display data (from API) -- in browser */}
        <div>Post page (test Data Fetching)</div>

        {posts.map((item) => (
          <div>
            <p>{item.id}</p>
            <p>
              <b>{item.title}</b>
            </p>
            <p>{item.body}</p>
          </div>
        ))}

      </LayoutComponent>
    </>
  );
}

//! getServerSideProps() -- run SSR (server-side) > rendered on server
//TODO: then display it on client
export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return { props: { posts } };
}