'use client';

import React, { useState } from 'react';

interface AddProfileFormProps {
    onProfileCreated: () => void;
}

export default function AddProfileForm({ onProfileCreated }: AddProfileFormProps) {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [skills, setSkills] = useState(''); 
    const [github, setGithub] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const resetForm = () => {
        setName('');
        setBio('');
        setSkills('');
        setGithub('');
        setLinkedin('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (!name) {
            setMessage('Error: Full Name is required.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/developers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, bio, skills, github, linkedin }),
            });

            if (response.ok) {
                setMessage('Profile created successfully! List updating...');
                
                resetForm();
                
                onProfileCreated(); 

            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message || 'Failed to create profile.'}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            setMessage('Failed to connect to the backend server. Is it running on port 5000?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg mx-auto mb-10">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Add Your Developer Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                
                <input 
                    type="text" 
                    placeholder="Full Name *" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    className="w-full p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />

                <textarea
                    placeholder="Short Bio (What do you do?)"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />

                <input 
                    type="text" 
                    placeholder="Skills (e.g., React, Node, MongoDB)" 
                    value={skills} 
                    onChange={(e) => setSkills(e.target.value)} 
                    className="w-full p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />

                <input 
                    type="url" 
                    placeholder="GitHub Link (https://...)" 
                    value={github} 
                    onChange={(e) => setGithub(e.target.value)} 
                    className="w-full p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />

                <input 
                    type="url" 
                    placeholder="LinkedIn Link (https://...)" 
                    value={linkedin} 
                    onChange={(e) => setLinkedin(e.target.value)} 
                    className="w-full p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full px-4 py-3 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition duration-150 disabled:bg-gray-400"
                >
                    {loading ? 'Submitting...' : 'Create Profile'}
                </button>
            </form>
            {message && <p className={`mt-4 text-center ${message.startsWith('Error') ? 'text-red-500' : 'text-green-600'}`}>{message}</p>}
        </div>
    );
}
