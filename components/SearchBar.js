import { useState } from "react";
import styled from "styled-components";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value); 
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search countries..."
        value={query}
        onChange={handleSearch}
      />
    </SearchContainer>
  );
};

// Styled Components
const SearchContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 80%;
  max-width: 400px;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

export default SearchBar;
