import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Social } from '@builddao/near-social-js';
import '../css/Discover.css';

interface Profile {
  accountId: string;
  name?: string;
  image?: {
    url?: string;
  };
}

const nearSocialApi = new Social({
  network: 'mainnet'
});

const DiscoverPeople: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const initialAccounts = [
          'petarvujovic.near',
          'mob.near',
          'zavodil.near',
          'root.near',
          'nearweek.near',
          'mintbase.near'
        ];

        const fetchedProfiles = await nearSocialApi.get({
          keys: initialAccounts.map(account => `${account}/profile/*`)
        });
        
        const formattedProfiles = Object.entries(fetchedProfiles || {}).map(([accountId, data]: [string, any]) => ({
          accountId,
          name: data?.profile?.name || accountId,
          image: {
            url: data?.profile?.image?.url || 'https://via.placeholder.com/150'
          }
        }));

        setProfiles(formattedProfiles);
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

  if (loading) {
    return (
      <section className="discover-section discover-people">
        <h2>discover people</h2>
        <div>Loading profiles...</div>
      </section>
    );
  }

  return (
    <section className="discover-section discover-people">
      <h2>discover people</h2>
      <div className="apps-grid">
        {profiles.map((profile) => (
          <div
            key={profile.accountId}
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