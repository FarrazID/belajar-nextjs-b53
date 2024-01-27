// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  // res.status(200).json({ name: 'John Doe' })
  try {
    const response = await(fetch('https://dummyjson.com/users')).json();
    res.status(200).json({ ...response });

  } catch (error) {
    res.status(500).json({ error })
  }

}
