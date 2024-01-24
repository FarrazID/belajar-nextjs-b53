import Layout from "@/layout";
import { useRouter } from "next/router";


//! when use Nested route: --> Link to: pages/users/detail.js
//TODO: if we open http://localhost:3000/users/detail --> p: User detail

//! Define 'Dynamic Routes' --> Link to: pages/users/[id].js
//TODO: if we open http://localhost:3000/users/xgakgd --> p: User by Name (/random slug)
//* after using useRouter -- we get the id value by: router?.query 

export default function UserByName() {
  const router = useRouter();
  const { id } = router?.query;

  //TODO: at browser -- inspect -- check console
  console.log('router =>', router?.query);

  return (
    <Layout>
      {/* <p>User by Name (/random slug)</p> */}
      <p>User by Name: {id}</p>
    </Layout>
  )
};
