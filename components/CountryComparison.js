import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const CountryComparison = ({ countries }) => {
  const [selectedCountries, setSelectedCountries] = useState(["", ""]);
  const [gdpData, setGdpData] = useState({});

  if (!countries || countries.length === 0) {
    return <p>No countries available for comparison.</p>;
  }

  const handleSelect = (index, value) => {
    setSelectedCountries((prev) => {
      const newSelection = [...prev];
      newSelection[index] = value;
      return newSelection;
    });
  };

  const countryA = countries.find((c) => c.name.common === selectedCountries[0]);
  const countryB = countries.find((c) => c.name.common === selectedCountries[1]);

  // Fetch GDP Data from World Bank API
  useEffect(() => {
    const fetchGdpData = async () => {
      if (!selectedCountries[0] || !selectedCountries[1]) return;

      try {
        const countryCodes = selectedCountries.map((name) =>
          countries.find((c) => c.name.common === name)?.cca2
        );

        const response = await fetch(
          `https://api.worldbank.org/v2/country/${countryCodes.join(";")}/indicator/NY.GDP.MKTP.CD?format=json&date=2022`
        );
        const data = await response.json();

        if (data[1]) {
          const newGdpData = {};
          data[1].forEach((entry) => {
            newGdpData[entry.country.id] = entry.value;
          });
          setGdpData(newGdpData);
        }
      } catch (error) {
        console.error("Failed to fetch GDP data:", error);
      }
    };

    fetchGdpData();
  }, [selectedCountries, countries]);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <h2>Select Two Countries to Compare</h2>
      <DropdownContainer>
        <select onChange={(e) => handleSelect(0, e.target.value)}>
          <option value="">Select Country A</option>
          {countries.map((c) => (
            <option key={c.cca2} value={c.name.common}>
              {c.name.common}
            </option>
          ))}
        </select>

        <select onChange={(e) => handleSelect(1, e.target.value)}>
          <option value="">Select Country B</option>
          {countries
            .filter((c) => c.name.common !== selectedCountries[0]) // Prevent duplicate selection
            .map((c) => (
              <option key={c.cca2} value={c.name.common}>
                {c.name.common}
              </option>
            ))}
        </select>
      </DropdownContainer>

      {countryA && countryB && (
        <ComparisonTable>
          <thead>
            <tr>
              <th>Metric</th>
              <th>{countryA.name.common}</th>
              <th>{countryB.name.common}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Population</td>
              <td>{countryA.population.toLocaleString()}</td>
              <td>{countryB.population.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Area (km²)</td>
              <td>{countryA.area.toLocaleString()}</td>
              <td>{countryB.area.toLocaleString()}</td>
            </tr>
            <tr>
              <td>GDP (USD)</td>
              <td>${gdpData[countryA.cca2]?.toLocaleString() || "N/A"}</td>
              <td>${gdpData[countryB.cca2]?.toLocaleString() || "N/A"}</td>
            </tr>
          </tbody>
        </ComparisonTable>
      )}
    </motion.div>
  );
};

export default CountryComparison;

// Styled Components
const DropdownContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;

  select {
    padding: 10px;
    font-size: 16px;
    border: 2px solid #ccc;
    border-radius: 8px;
    outline: none;

    &:focus {
      border-color: #007bff;
    }
  }
`;

const ComparisonTable = styled(motion.table)`
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  border-collapse: collapse;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: center;
    font-size: 16px;
  }

  th {
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
  }
`;
