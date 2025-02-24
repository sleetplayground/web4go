import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NearSocialApi } from '@builddao/near-social-js';
import '../css/Discover.css';

interface Profile {
  accountId: string;
  name?: string;
  image?: {
    url?: string;
  };
}

const nearSocialApi = new NearSocialApi({
  networkId: 'mainnet',
  nodeUrl: 'https://rpc.mainnet.near.org',
  contractName: 'social.near'
});

const DiscoverPeople: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        // Fetch some initial NEAR accounts to display
        const initialAccounts = [
          'petarvujovic.near',
          'mob.near',
          'zavodil.near',
          'root.near',
          'nearweek.near',
          'mintbase.near'
        ];

        const fetchedProfiles = await nearSocialApi.getProfiles(initialAccounts);
        const formattedProfiles = Object.entries(fetchedProfiles).map(([accountId, data]) => ({
          accountId,
          name: data?.name || accountId,
          image: {
            url: data?.image?.url || 'https://via.placeholder.com/150'
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
        {profiles.map((profile, index) => (
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