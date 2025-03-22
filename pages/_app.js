import { ApolloProvider } from "@apollo/client";
import createApolloClient from "../utils/apolloClient"; 
import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import GlobalStyles from "../styles/globalStyles";
import { lightTheme, darkTheme } from "../styles/theme";

const client = createApolloClient(); 

function MyApp({ Component, pageProps }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") === "dark";
    setIsDarkMode(storedTheme);
  }, []);

  // Toggle theme and store it in localStorage
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light"); 
      return newMode;
    });
  };


  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Component {...pageProps} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
