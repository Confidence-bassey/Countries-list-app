import styled from "styled-components";

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
`;

export const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: ${(props) => props.theme.borderRadius};
  font-size: 16px;

  &:hover {
    background-color: darkblue;
  }
`;

export const Card = styled.div`
  background: white;
  padding: ${(props) => props.theme.spacing.medium};
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: ${(props) => props.theme.spacing.medium};
`;
