// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

//! API Routes -- to create public API
//? possible to write BACKEND code in NextJS
// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

//! API Local -- call External API
//? when tracking from client side (browser) -- it will be hidden (isolate)
export default async function handler(req, res) {
  try {
    const response = await (await fetch("https://dummyjson.com/users")).json();
    res.status(200).json({ ...response });

  } catch (error) {
    // res.status(500).json({ error })
  }
}
