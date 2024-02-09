import React from "react";

//! --- Tugaas H4; define Higher-Order-Component (HOC) ---
// -- create new component within, from other component (function / const)
// -- EX: to define authentication (validation) certain page for 'admin-only'

//TODO: version 1 -- define HOC (withAuth) as a 'function'
// function withAuth(WrappedComponent) {
//   return function WithAuth(props) {
//     const isLogin = false;

//     if (!isLogin) return <div>Anda harus login</div>;

//     return <WrappedComponent {...props} />;

//   };
// };
// export default withAuth;

//TODO: version 2 -- define HOC (withAuth) as a 'const' (variable)
export const withAuth = (Component) => {
  return (props) => {
    const isLogin = true; //true: admin is logged-in

    if (!isLogin) return <div>Anda harus login</div>;

    return <Component {...props} />;
  };
};