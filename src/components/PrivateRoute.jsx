import { useState } from "react";
import { Navigate } from "react-router-dom";
import Admin from "./Admin";
import { Api } from "../../core/http";
const PrivateRoute = () => {
  const api = new Api();
  // eslint-disable-next-line no-unused-vars
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const user = async (data) => {
    const response = await api.post("login", JSON.stringify(data));

    const responseData = await response.json();
    const token = JSON.stringify(responseData.access_token);
    const isAdmin = await fetch("https://api.basilica.finance/is-admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // eslint-disable-next-line
        // prettier-ignore
        "Authorization": `Bearer ${token}`,
      },
    });
    console.log(isAdmin);
    return isAdmin;
  };

  return <>{user ? <Admin /> : <Navigate to="/login" />};</>;
};
export default PrivateRoute;
