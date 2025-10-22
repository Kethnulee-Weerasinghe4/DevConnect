'use client';

import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    onSearch(term);
  };

  return (
    <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner">
      <input
        type="text"
        placeholder="Search developers by name or skill (e.g., Jane Doe, React)"
        value={searchTerm}
        onChange={handleChange}
        className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
      />
    </div>
  );
};

export default SearchBar;
