import PropTypes from "prop-types";

import { Button } from "../button/Button.styles";
import { Heading } from "../header/Heading.styles";
import GlobalStyles from "../../global/GlobalStyle";
import { Box, StyledErrorFallback } from "./ErrorFallback.styles";

const ErrorFallBack = ({ error, resetErrorBoundary }) => {
  return (
    <>
      <GlobalStyles />
      <StyledErrorFallback>
        <Box>
          <Heading as='h1'> Something went wrong ❌ </Heading>
          <p>{error.message}</p>
          <Button
            size='large'
            onClick={resetErrorBoundary}
          >
            Try again{" "}
          </Button>
        </Box>
      </StyledErrorFallback>
    </>
  );
};

ErrorFallBack.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func,
};

export default ErrorFallBack;
