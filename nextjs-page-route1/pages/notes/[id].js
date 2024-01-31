import dynamic from "next/dynamic";

//! Using dynamic import (wrapper: 'LayoutComponent')
const LayoutComponent = dynamic(() => import('@/layout'));

export default function DetailNotes({ notes }) {
  //! TEST: display data (from API) -- in console
  console.log('detail notes =>', notes);

  return (
    <LayoutComponent metaTitle="Detail Notes">
      {/* Detail Notes -- via dynamic route */}

      {/* TEST: display data (from API) -- in browser */}
      <div>
        <p>title: {notes.data.title}</p>
        <p>desc: {notes.data.description}</p>
        <p>update at: {notes.data.updated_at}</p>
      </div>

    </LayoutComponent>
  );
}

//? getStaticPath() -- provide terkait path (route) -- yg di build secara statis
//? getStaticProps() -- to provide/generate content & data 

//! getStaticPaths -- required for dynamic SSG pages
export async function getStaticPaths() {
  const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
  const notes = await res.json();

  // Get the paths (route) -- get from mapping of notes 'id' 
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
//TODO: it wll get notes 'id' -- via mapping
// getStaticProps() -- to provide/generate content & data 

export async function getStaticProps(context) {
  const { id } = context.params; //destructuring

  const res = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes/${id}`);
  const notes = await res.json();
  return { props: { notes }, revalidate: 10 };
}

