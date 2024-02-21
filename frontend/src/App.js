import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import Signup from "./components/signup";
// import Login from "./components/login";
import Guard from "./utils/custom.guard";
// import Profile from "./components/profile";
import { AuthContext } from "./utils/user.context";
import useUserContext from "./utils/user.context";

import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import Login from "./pages/login";
import Tag from "./pages/tag";
import Product from "./pages/product";
import Product_Category from "./pages/product-category";
import Order from "./pages/order";
import Add_Product from "./pages/add-product";
import Payment_Failed from "./pages/failed-payment";
import Update_Product from "./pages/update-product";

import { ToastContainer } from "react-toastify";

function App() {
  const data = useUserContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    data.login(JSON.parse(token));
  }, []);

  return (
    <AuthContext.Provider value={data}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {Guard(Login, "/", { unAuthRequire: true })}
          {/* {Guard(Login, "/login", { unAuthRequire: true })} */}
          {Guard(Dashboard, "/dashboard", { authRequire: true })}
          {Guard(Users, "/users", { authRequire: true })}
          {Guard(Tag, "/tag", { authRequire: true })}
          {Guard(Product, "/product", { authRequire: true })}
          {Guard(Product_Category, "/product-category", { authRequire: true })}
          {Guard(Order, "/order", { authRequire: true })}
          {Guard(Add_Product, "/add-product", { authRequire: true })}
          {Guard(Payment_Failed, "/failed-payment", { authRequire: true })}
          {Guard(Update_Product, "/update-product", { authRequire: true })}
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
