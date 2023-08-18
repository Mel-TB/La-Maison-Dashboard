import isPropValid from "@emotion/is-prop-valid";
import { StyleSheetManager } from "styled-components";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import AppLayout from "./ui/appLayout/AppLayout";

import Dashboard from "./pages/dashboard/Dashboard";
import Bookings from "./pages/bookings/Bookings";
import Account from "./pages/account/Account";
import Cabins from "./pages/cabins/Cabins";
import Login from "./pages/login/Login";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Settings from "./pages/settings/Settings";
import Users from "./pages/users/Users";

import GlobalStyles from "./global/GlobalStyle";
import Booking from "./pages/booking/Booking";
import Checkin from "./pages/checkin/Checkin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
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
                path='bookings/:bookingId'
                element={<Booking />}
              />
              <Route
                path='checkin/:bookingId'
                element={<Checkin />}
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
        <Toaster
          position='top-center'
          reverseOrder={false}
          gutter={8}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 2000,
            },
            error: {
              duration: 3000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </StyleSheetManager>
  );
};

export default App;
