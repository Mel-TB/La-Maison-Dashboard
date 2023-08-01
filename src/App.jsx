import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
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
    </QueryClientProvider>
  );
};

export default App;
