import styled from "styled-components";
import { motion } from "framer-motion";

const ErrorWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: ${(props) => props.theme.colors.errorBackground};
  color: ${(props) => props.theme.colors.errorText};
  border-radius: 8px;
  text-align: center;
  margin: 20px auto;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = ({ message }) => {
  return (
    <ErrorWrapper
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>⚠️ Error</h3>
      <p>{message || "Something went wrong. Please try again."}</p>
    </ErrorWrapper>
  );
};

export default ErrorMessage;
