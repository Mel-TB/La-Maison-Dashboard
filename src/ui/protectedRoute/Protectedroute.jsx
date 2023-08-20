/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useUser } from "../../features/authentication/hooks/useUser";
import { Spinner } from "../spinner/Spinner.styles";
import { FullPage } from "./ProtectedRoute.styles";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  //* A) Load authenticated user
  const { isLoading, isAuthenticated } = useUser();

  //* B) No authenticated user, redirect => login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated, isLoading]);

  //* C) Show spinner while loading
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  //* D) Authenticated user render => app
  if (isAuthenticated) {
    return children;
  }
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};
export default ProtectedRoute;
