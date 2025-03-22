import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Container } from "../styles/styledComponents";
import ThemeToggleButton from "../components/ThemeToggle";
import SearchBar from "../components/SearchBar";
import CountryTable from "../components/CountryTable";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      capital
      emoji
    }
  }
`;

const HomePage = ({ isDarkMode, toggleTheme }) => { 
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={`Failed to load countries. ${error.message}`} />;

  const filteredCountries = data?.countries?.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <ThemeToggleButton isDarkMode={isDarkMode} toggleTheme={toggleTheme} /> 
      <h1>Welcome to Country Explorer</h1>
      <SearchBar onSearch={setSearchQuery} />
      <CountryTable countries={filteredCountries} />
    </Container>
  );
};

export default HomePage;

