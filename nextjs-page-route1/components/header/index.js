import withAuth from "../with-auth";
import Menu from "../menu";
import styles from "./styles.module.css";

// use Snippet enf -- export name function
// use Snippet edf -- export default function
function Header() {
  return (
    <div className={styles.header}>
      <Menu />
    </div>
  );
};

export default withAuth(Header); //! this method is updated, instead of bootcamp-video
// export default Header;
