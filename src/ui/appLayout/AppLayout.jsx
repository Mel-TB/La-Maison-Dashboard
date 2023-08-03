import { Outlet } from "react-router-dom";

import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

import { Container, Main, StyledAppLayout } from "./AppLayout.styles";

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
};

export default AppLayout;
