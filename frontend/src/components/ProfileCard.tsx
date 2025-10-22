import React from 'react';

interface Developer {
  _id: string;
  name: string;
  bio: string;
  skills: string[];
  github?: string;
  linkedin?: string;
}

interface ProfileCardProps {
  developer: Developer;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ developer }) => {
  const { name, bio, skills, github, linkedin } = developer;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300 ease-in-out flex flex-col h-full">
      <h2 className="text-3xl font-extrabold text-blue-800 mb-2">{name}</h2>
      
      <p className="text-gray-600 italic mb-4 flex-grow">
        {bio || "No bio provided."}
      </p>

      {/* Skills Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Skills:</h3>
        <div className="flex flex-wrap gap-2">
          {skills && skills.length > 0 ? (
            skills.map((skill, index) => (
              <span 
                key={index} 
                className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-sm">No skills listed.</span>
          )}
        </div>
      </div>

      {/* Links Section */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Connect:</h3>
        <div className="flex space-x-4">
          {github && (
            <a 
              href={github.startsWith('http') ? github : `https://${github}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
            >
              GitHub 
            </a>
          )}
          {linkedin && (
            <a 
              href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              LinkedIn 
            </a>
          )}
          {(!github && !linkedin) && (
            <span className="text-gray-500 text-sm">No external links.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
