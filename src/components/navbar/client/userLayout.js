import React from "react";
import NavbarClient from "./index";
import UserFooter from "../../footer/client/index";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <NavbarClient />
      <main>
        <Outlet />
      </main>
      <UserFooter />
    </div>
  );
};

export default UserLayout;
