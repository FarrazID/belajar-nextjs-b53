// import Layout from "@/layout";
// import Image from "next/image";
import dynamic from "next/dynamic";

//! Using Next Image - optimasi loaded-image size: .png --> .webp
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

//! Using dynamic import
//TODO: create new component -- where all routing pages (@/layout) will be wrapped using dynamic()
const LayoutComponent = dynamic(() => import('@/layout')); // <-- use dynamic() to import component
export default function Main() {
  return (
    <>
      <LayoutComponent metaTitle="Main (Home)">
        <p>-- Home page --</p>
      </LayoutComponent>
    </>
  )
};


