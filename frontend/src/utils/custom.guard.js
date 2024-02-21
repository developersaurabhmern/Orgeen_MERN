import { Route } from "react-router-dom";
import Redirect from "../components/redirect";

function Guard(Component, path, permission) {
  const token = JSON.parse(localStorage.getItem("token"));

  if (permission.authRequire && !token) {
    return <Route path={path} element={<Redirect path="/" />} />;
  } else if (permission.unAuthRequire && token) {
    return <Route path={path} element={<Redirect path="/dashboard" />} />;
  } else {
    return <Route path={path} element={<Component />} />;
  }
}

export default Guard;
