import React from "react";

const CountryTable = ({ countries }) => {
  if (!countries || countries.length === 0) {
    return <p>No countries found.</p>; // ✅ Handle empty data
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Flag</th>
          <th>Name</th>
          <th>Capital</th>
        </tr>
      </thead>
      <tbody>
        {countries.map((country) => (
          <tr key={country.code}>
            <td>{country.emoji || "🏳"}</td> {/* ✅ Show flag emoji or default */}
            <td>{country.name || "Unknown"}</td>
            <td>{country.capital || "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CountryTable;
