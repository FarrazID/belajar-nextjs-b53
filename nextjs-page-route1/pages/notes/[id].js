import dynamic from "next/dynamic";
import Link from "next/link";

//! Using dynamic import (use wrapper: 'LayoutComponent')
const LayoutComponent = dynamic(() => import('@/layout'));

export default function DetailNotes({ notes }) {
  return (
    <LayoutComponent metaTitle="Detail Notes">
      {/* Detail Notes xx */}
      <div>
        <p>title: {notes.data.title}</p>
        <p>desc: {notes.data.description}</p>
        <p>update at: {notes.data.updated_at}</p>
      </div>

      {/* {notes.data.map((item) => (
        <div>
          <Link href={`/notes/${item.id}`}>{item.title}</Link>
        </div>

      ))} */}
    </LayoutComponent>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
  const notes = await res.json();

  const paths = notes.data.map((item) => ({
    params: {
      id: item.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(
    `https://paace-f178cafcae7b.nevacloud.io/api/notes/${id}`
  );
  const notes = await res.json();
  return { props: { notes }, revalidate: 10 };
}