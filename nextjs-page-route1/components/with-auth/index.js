import React from "react";

// define Higher-Order-Component (HOC): create component inside from component
// -- EX: to define authentication (validation) certain page for admin-only
const withAuth = (WrappedComponent) => {
  return function WithAuth(props) {
    const isLogin = true;

    if (!isLogin) return <div>Anda harus login</div>;

    return <WrappedComponent {...props} />;

  };
};

export default withAuth;
