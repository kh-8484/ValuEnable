import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = (Component: any) => {
  const AuthCheck = (props: any) => {
    const navigate = useNavigate();

    useEffect(() => {
      const isAuthenticated = localStorage.getItem("token");

      if (!isAuthenticated) {
        navigate("/login");
      }
    }, []);

    return <Component {...props} />;
  };

  return AuthCheck;
};

export default Auth;
