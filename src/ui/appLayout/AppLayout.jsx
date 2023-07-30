import { Outlet } from "react-router-dom";

import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

import { Main, StyledAppLayout } from "./AppLayout.styles";

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
};

export default AppLayout;
