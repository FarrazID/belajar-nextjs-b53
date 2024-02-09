import Link from "next/link";

import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { useQueries } from "@/hooks/useQueries";
import { useMutation } from "@/hooks/useMutation";

import Cookies from "js-cookie";

//TODO: call HOC (withAuth) as a const (variable) -- with bracket {..}
import { withAuth } from "../with-auth";
//TODO: call HOC (withAuth) as a function -- no bracket {..}
// import withAuth from "../with-auth";
// import Menu from "../menu";

import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

import styles from "./styles.module.css";

// export default function Header() { //-- we use this method, if we don't use HOC (witAuth) below
// function Header() {  //-- we use this method, when we use HOC (witAuth) below
const Header = () => {
  const router = useRouter();
  //! -- Tugas H17: State management using Context API
  const userData = useContext(UserContext);

  const { mutate } = useMutation();
  const { data } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  const HandleLogout = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/logout",
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (!response?.success) {
      console.log("gagal logout");
    } else {
      Cookies.remove("user_token");
      router.push("/login");
    }
  };

  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile 1</Link>
        </li>
        <li>
          <Link href="/profile2">Profile 2</Link>
        </li>
        <li>
          <Link href="/users">Users</Link>
        </li>
        <li>
          <Link href="/notes">Notes</Link>
        </li>
        <li>
          <Link href="/posts">Posts</Link>
        </li>

        <li>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {/* <MenuButton as={Button} > */}
              {data?.data?.name}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => HandleLogout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </li>

      </ul>
    </div>
  );
}

export default withAuth(Header); //! using HOC 
//? -- to isolate access (component 'Header') for 'admin-only' & 'users'
//? -- this method is updated, instead of bootcamp-video
// export default Header; //! without HOC