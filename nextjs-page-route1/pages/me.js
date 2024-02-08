// import { InputDate, InputText } from "@/components/form";
import stylesHome from "@/styles/Home.module.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const Layout = dynamic(() => import("@/layout"));
const InputDate = dynamic(() =>
  import("@/components/form").then((mod) => mod.InputDate)
);

export default function Me() {
  const [field, setField] = useState({
    name: "",
    age: "",
  });

  console.log("value form => ", field);
  return (
    <Layout metaDesc="Profile Anda" metaTitle="Profile - App Media Sosial">
      <div className="container-red">
        <h1>Page Me</h1>
      </div>
      <div className={stylesHome.container_blue}>
        <h1>Warna Biru</h1>
      </div>
      <div>
        <h1 className="text-3xl text-violet-900 font-bold underline">
          Warna Biru
        </h1>
      </div>
      <div className="grid grid-rows-4 grid-flow-col gap-4">
        <div className="bg-slate-600 drop-shadow-sm">01</div>
      </div>
      <InputDate />
      <button
        onClick={() => {
          const { v4 } = require("uuid");
          console.log("uuid => ", v4());
        }}
      >
        Click Me
      </button>
      <input
        value={field.name}
        placeholder="name"
        onChange={(event) => setField({ ...field, name: event.target.value })}
      />
      <input
        value={field.age}
        placeholder="age"
        onChange={(event) => setField({ ...field, age: event.target.value })}
      />
    </Layout>
  );
}
