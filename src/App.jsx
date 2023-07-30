import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Bookings from "./pages/bookings/Bookings";
import Account from "./pages/account/Account";
import Cabins from "./pages/cabins/Cabins";
import Login from "./pages/login/Login";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Settings from "./pages/settings/Settings";
import Users from "./pages/users/Users";
import AppLayout from "./ui/appLayout/AppLayout";

import GlobalStyles from "./global/GlobalStyle";

const App = () => {
  return (
    <>
      <GlobalStyles />

      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route
              index
              element={
                <Navigate
                  replace
                  to='dashboard'
                />
              }
            />
            <Route
              path='dashboard'
              element={<Dashboard />}
            />
            <Route
              path='bookings'
              element={<Bookings />}
            />
            <Route
              path='cabins'
              element={<Cabins />}
            />
            <Route
              path='users'
              element={<Users />}
            />
            <Route
              path='settings'
              element={<Settings />}
            />
            <Route
              path='account'
              element={<Account />}
            />
          </Route>

          <Route
            path='login'
            element={<Login />}
          />
          <Route
            path='*'
            element={<PageNotFound />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
