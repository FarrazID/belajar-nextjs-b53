import withAuth from "../with-auth";
import Menu from "../menu";


// use Snippet enf -- export name function
// use Snippet edf -- export default function
function Header() {
  return (
    <div>
      <Menu />
    </div>
  );
};

// export default withAuth(Header); //! this method is not working
export default Header;
