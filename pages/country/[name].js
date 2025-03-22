import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { motion } from "framer-motion";

const GET_COUNTRY_DETAILS = gql`
  query GetCountryDetails($name: String!) {
    country(name: $name) {
      name
      capital
      population
      area
      region
      subregion
      currencies {
        code
        name
        symbol
      }
      languages {
        name
      }
      flags {
        png
        svg
      }
    }
  }
`;

const CountryDetails = () => {
  const router = useRouter();
  const { name } = router.query;
  const { loading, error, data } = useQuery(GET_COUNTRY_DETAILS, {
    variables: { name },
    skip: !name, // Skip query if no name is available
  });

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message="Error fetching country details." />;
  if (!data || !data.country) return <ErrorMessage message="Country not found." />;

  const { country } = data;

  return (
    <Container
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Flag src={country.flags.png} alt={`${country.name} Flag`} />
      <h1>{country.name}</h1>
      <Details>
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Region:</strong> {country.region} - {country.subregion}</p>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
        <p><strong>Currency:</strong> {country.currencies.map(c => `${c.name} (${c.symbol})`).join(", ")}</p>
        <p><strong>Languages:</strong> {country.languages.map(l => l.name).join(", ")}</p>
      </Details>
      <BackButton onClick={() => router.push("/")}>← Back to Countries</BackButton>
    </Container>
  );
};

export default CountryDetails;

// Styled Components
const Container = styled(motion.div)`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: ${(props) => props.theme.colors.card};
  color: ${(props) => props.theme.colors.text};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Flag = styled.img`
  width: 150px;
  height: auto;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Details = styled.div`
  text-align: left;
  p {
    margin: 10px 0;
    font-size: 16px;
  }
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 15px;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: darkblue;
  }
`;
