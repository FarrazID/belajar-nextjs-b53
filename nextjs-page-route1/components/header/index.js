import withAuth from "../with-auth";
// import Menu from "../menu";
import styles from "./styles.module.css";

// use Snippet enf -- export name function
// use Snippet edf -- export default function
function Header() {
  return (
    //! for simulation: call component: Menu -- from 'header' area
    // <div className={styles.header}>
    //   <Menu />
    //   <p>Header section</p>
    // </div>
    <div className={styles.header}>
      <p>Header-section</p>
    </div>
  );
};

export default withAuth(Header); //! this method is updated, instead of bootcamp-video
// export default Header;
