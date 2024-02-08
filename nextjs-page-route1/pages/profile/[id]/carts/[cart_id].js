import Layout from "@/layout";
import { useRouter } from "next/router";

export default function Me() {
  const router = useRouter();
  const { query } = router;

  console.log("router =>", query);
  return (
    <Layout metaDesc="Profile Anda" metaTitle="Profile - App Media Sosial">
      INI PROFILE dengan Dynamic Parameter (router)
      <p>USER ID: {query?.id}</p>
      <p>CART ID: {query?.cart_id}</p>
    </Layout>
  );
}
