import dynamic from "next/dynamic";
import Link from "next/link";


//! Using dynamic import (use wrapper: 'LayoutComponent')
const LayoutComponent = dynamic(() => import('@/layout')); // <-- use dynamic() to import component

//! --------- TUGAS: H11 - Data Fetching (1) -------------
export default function Notes({ notes }) {
  //TODO: use console to check data fetching -- & inspect browser
  console.log('notes data =>', notes);
  return (
    <>
      <LayoutComponent metaTitle="Notes @Top">
        {/* <p>-- Notes page (test Data Fetching) --</p> */}
        {/* use map() to loop & display data (from array) */}
        {notes.data.map((item) => (

          //! TEST: to check data fetching & display data -- without <Link>
          // <div style={{ border: "1px solid grey", margin: "5px", padding: "5px" }}>
          //   <p>{item.title}</p>
          //   <p>{item.description}</p>
          // </div>

          //! when we click note-title > it will open it's detail page
          //? the detail for each note -- is in pages/notes/[id].js (dynamic route)
          <div>
            <Link href={`/notes/${item.id}`}>{item.title}</Link>
          </div>

        ))}
      </LayoutComponent>
    </>
  )
};


//! --------- TUGAS: H11 - Data Fetching (2) -------------
//! 1)  Data Fetching (from API) using: 'getstaticProps()'-- as a part of SSG (Static Site Generation)
// -- used to fetch data during the build process
// -- During the build, Next.js generates a 'static HTML file' for this page

//? - after build (npm run build) > it will create a 'static page' (.next/notes.html)
//? - this page will be cached as 'pre-rendered page'

export async function getStaticProps() {
  // const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
  const notes = await res.json();

  // return { props: { notes } }
  //! without revalidate - will not update 'client data' when API data changes (BE)

  return { props: { notes }, revalidate: 10 };
  //it will re-rendered every 10 seconds
}

//? to check pre-rendered page -- npm run start > localhost:3000 > inspect: Element

//! Advantages of SSG;
//? Improved Performance -- Users receive pre-generated static HTML files, resulting in faster page loads.
//? SEO-Friendly -- Search engines can easily crawl and index static pages, improving search engine rankings.
//? Reduced Server Load -- Since pages are generated at build time, there's less server-side processing
//?     needed at runtime, reducing server load.
//? CDN Compatibility -- Static files can be easily cached and distributed on CDNs for better global performance.
//? Cost-Efficiency -- Hosting and serving static files can be more cost-effective compared to
//?     dynamic server-side rendering.