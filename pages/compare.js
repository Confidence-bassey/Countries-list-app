import { useEffect, useState } from "react";
import { Container } from "../styles/styledComponents";
import CountryComparison from "../components/CountryComparison";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const ComparePage = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,population,area");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Failed to fetch country data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={`Failed to load countries. ${error}`} />;

  return (
    <Container>
      <h1>Compare Countries</h1>
      <CountryComparison countries={countries} />
    </Container>
  );
};

export default ComparePage;
