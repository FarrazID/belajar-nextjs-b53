import Link from "next/link";
import withAuth from "../with-auth";
// import Menu from "../menu";
import styles from "./styles.module.css";

// use Snippet enf -- export name functions
// use Snippet edf -- export default function
function Header() {
  return (
    //! for simulation: call component: Menu() -- from 'header' area
    // <div className={styles.header}>
    //   <Menu />
    //   <p>Header section</p>
    // </div>

    <div className={styles.header}>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/profile">Profile v1</Link></li>
        <li><Link href="/profile2">Profile v2</Link></li>
        <li><Link href="/me">Profile Me</Link></li>
        <li><Link href="/users">User</Link></li>
        <li><Link href="/notes">Notes</Link></li>
      </ul>
    </div>
  );
};

export default withAuth(Header); //! this method is updated, instead of bootcamp-video
// export default Header;
