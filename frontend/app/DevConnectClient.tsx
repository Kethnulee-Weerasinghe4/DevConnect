'use client';

import React, { useState, useEffect, useCallback } from 'react';
import AddProfileForm from '../components/AddProfileForm';
import ProfileCard from '../components/ProfileCard';
import SearchBar from '../components/SearchBar';

interface Developer {
  _id: string;
  name: string;
  bio: string;
  skills: string[];
  github?: string;
  linkedin?: string;
}

const DevConnectClient: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDevelopers = useCallback(async (term = '') => {
    setLoading(true);
    try {
      const url = `http://localhost:5000/api/developers?search=${encodeURIComponent(term)}`;
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: Developer[] = await res.json();
      setDevelopers(data);
    } catch (error) {
      console.error('Error fetching developers:', error);
      setDevelopers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDevelopers(searchTerm);
  }, [searchTerm, fetchDevelopers]);

  const handleProfileCreated = () => {
    fetchDevelopers(searchTerm);
  };

  return (
    <main className="container mx-auto p-4 sm:p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-2">DevConnect</h1>
        <p className="text-xl text-gray-500">The Developer Profile Directory</p>
      </header>

      {/* Profile Creation Form Section - now passes a refresh handler */}
      <section className="mb-12">
        <AddProfileForm onProfileCreated={handleProfileCreated} />
      </section>

      {/* Search Bar Section */}
      <section className="mb-10">
        <SearchBar onSearch={setSearchTerm} />
      </section>

      {/* Profiles List Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b pb-2">
          {searchTerm ? `Search Results (${developers.length})` : `All Profiles (${developers.length})`}
        </h2>
        
        {loading ? (
          <p className="text-center text-xl text-blue-600">Loading profiles...</p>
        ) : developers.length === 0 ? (
          <div className="text-center p-6 bg-gray-100 text-gray-700 rounded-lg">
            <p>No profiles found {searchTerm ? 'matching your search criteria.' : '.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developers.map((dev) => (
              <ProfileCard key={dev._id} developer={dev} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default DevConnectClient;
