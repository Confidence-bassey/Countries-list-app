import ThemeToggleButton from "./ThemeToggleButton";

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <nav>
      <h1>Country Explorer</h1>
      <ThemeToggleButton isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </nav>
  );
};

export default Navbar;
