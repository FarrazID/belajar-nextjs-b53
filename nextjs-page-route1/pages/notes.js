import dynamic from "next/dynamic";

//! Using dynamic import (wrapper: LayoutComponent)
const LayoutComponent = dynamic(() => import('@/layout')); // <-- use dynamic() to import component
export default function Notes({ notes }) {
  console.log('notes =>', notes);
  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <p>-- Notes page (test Data Fetching) --</p>
      </LayoutComponent>
    </>
  )
};

//! Data Fetching use: getstaticProps
export async function getStaticProps() {
  // const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
  const notes = await res.json()
  return { props: { notes } }
}

