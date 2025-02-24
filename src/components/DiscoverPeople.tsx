import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Discover.css';

interface Profile {
  accountId: string;
  name?: string;
  image?: {
    url?: string;
  };
}

const DiscoverPeople: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        // TODO: Implement actual profile fetching using NEAR Social contract
        // This is a placeholder for now
        const mockProfiles = [
          { accountId: 'alice.near', name: 'Alice', image: { url: 'https://via.placeholder.com/150' } },
          { accountId: 'bob.near', name: 'Bob', image: { url: 'https://via.placeholder.com/150' } },
          { accountId: 'charlie.near', name: 'Charlie', image: { url: 'https://via.placeholder.com/150' } },
        ];
        setProfiles(mockProfiles);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleProfileClick = (accountId: string) => {
    navigate(`/profile/${accountId}`);
  };

  return (
    <section className="discover-section discover-people">
      <h2>discover people</h2>
      <div className="apps-grid">
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="app-card"
            onClick={() => handleProfileClick(profile.accountId)}
          >
            <img
              src={profile.image?.url || 'https://via.placeholder.com/150'}
              alt={profile.name || profile.accountId}
              className="app-logo"
            />
            <p className="app-title">{profile.name || profile.accountId}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DiscoverPeople;