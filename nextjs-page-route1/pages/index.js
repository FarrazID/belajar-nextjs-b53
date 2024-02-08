// import Layout from "@/layout";
// import Image from "next/image";
import dynamic from "next/dynamic";

//! -- Tugas H8 : Using wrapper component: 'Layout'
//! -- Tugas H10: Using 'Next Image' - optimasi loaded-image size: .png --> .webp
// export default function Main() {
//   return (
//     <>
//       <Layout metaTitle="Home">
//         <p>Home</p>
//         <Image src="/nextjs-logo3.png" alt="logo" width={200} height={200} />

//         <span>take a span</span>
//         <img src="/nextjs-logo3.png" alt="logo" style={{ width: 200, height: 200 }} />
//       </Layout>
//     </>
//   )
// };

//! -- Tugas H10 : Using Dynamic Import -- to create new wrapper: 'LayoutComponent'
//? Dynamic import -- 'reduce size' rendering file -- app become 'faster', support 'Lazy Loading'
//TODO: create new component -- where all routing pages (@/layout) will be wrapped using dynamic()

const LayoutComponent = dynamic(() => import('@/layout')); // <-- use dynamic() to import component
export default function Main() {
  return (
    <>
      <LayoutComponent metaTitle="Main (Home)">
        <p>-- Home (pages/index.js) --</p>
      </LayoutComponent>
    </>
  )
};


