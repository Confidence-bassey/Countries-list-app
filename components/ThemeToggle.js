import styled from "styled-components";

const ThemeToggleButton = ({ isDarkMode, toggleTheme }) => {
  return (
    <Button onClick={toggleTheme}>
      {isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </Button>
  );
};

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  margin: 20px;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    opacity: 0.8;
  }
`;

export default ThemeToggleButton;
