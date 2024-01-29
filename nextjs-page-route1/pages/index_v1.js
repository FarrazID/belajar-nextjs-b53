//! THIS IS 'index.js' -- with no 'dynamic route' (from "next/dynamic")

// import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'

// import Header from '@/components/header'
// import Content from '@/components/content'
// import Footer from '@/components/footer'

import Layout from "@/layout"
import { useEffect } from "react"

// const inter = Inter({ subsets: ['latin'] })

//! default: call to all routing-pages (without layout component)
//? section <Head> -- moved into layout component
// export default function Home() {
//   return (
//     <div>
//       <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by create next app" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head> */}
//       <Header />
//       {/* <p>Content Area</p> */}
//       <Content />
//       <Footer />
//     </div>
//   )

//! if using 'layout component' (as wrapper)
export default function Main({ children }) {
  //TODO: simulate to fetch data -- using Local API ("/api/hello") -- display response in Console
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log('response =>', res))
      .catch((err) => console.log('error =>', err));
  }, []);


  return (
    <>
      <Layout metaTitle="Home">
        <p>Home page</p>
      </Layout>
    </>
  )
};


