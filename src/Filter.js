import React, { useState } from 'react';

const Filter = ({ onFilterChange }) => {
  const [language, setLanguage] = useState('all');
  const [year, setYear] = useState('all');
  const [sortBy, setSortBy] = useState('topRated');

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    onFilterChange({ language: event.target.value, year, sortBy });
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
    onFilterChange({ language, year: event.target.value, sortBy });
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
    onFilterChange({ language, year, sortBy: event.target.value });
  };

  return (
    <div>
      <label>
        Language:
        <select value={language} onChange={handleLanguageChange}>
          <option value="all">All</option>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="de">German</option>
        </select>
      </label>
      <label>
        Release Year:
        <select value={year} onChange={handleYearChange}>
          <option value="all">All</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </label>
      <label>
        Sort By:
        <select value={sortBy} onChange={handleSortByChange}>
          <option value="topRated">Top Rated</option>
          <option value="newest">Newest</option>
        </select>
      </label>
    </div>
  );
};

export default Filter;
