import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Social } from '@builddao/near-social-js';
import '../css/Discover.css';

interface Profile {
  accountId: string;
  name?: string;
  image?: {
    url?: string;
  };
  linktree?: {
    telegram?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
}

const nearSocialApi = new Social({
  network: 'mainnet',
  contractName: 'social.near',
  nodeUrl: 'https://rpc.mainnet.near.org',
  apiUrl: 'https://api.near.social/api/v1'
});

const DiscoverPeople: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const response = await nearSocialApi.get({
        keys: ['*/profile/**'],
        options: {
          limit: 24,
          order: 'desc',
          subscribe: false
        }
      });

      if (response && typeof response === 'object') {
        const fetchedProfiles = Object.entries(response)
          .filter(([_, data]: [string, any]) => data?.profile)
          .map(([accountId, data]: [string, any]) => ({
            accountId,
            name: data.profile.name || accountId,
            image: {
              url: data.profile.image?.url || 'https://via.placeholder.com/150'
            },
            linktree: data.profile.linktree || {}
          }));
        setProfiles(fetchedProfiles);
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await nearSocialApi.get({
        keys: ['*/profile/**'],
        options: {
          limit: 10,
          subscribe: false
        }
      });

      if (response && typeof response === 'object') {
        const results = Object.entries(response)
          .filter(([accountId, data]: [string, any]) => {
            const profile = data?.profile;
            return profile && (
              accountId.toLowerCase().includes(query.toLowerCase()) ||
              profile.name?.toLowerCase().includes(query.toLowerCase())
            );
          })
          .map(([accountId, data]: [string, any]) => ({
            accountId,
            name: data.profile.name || accountId,
            image: {
              url: data.profile.image?.url || 'https://via.placeholder.com/150'
            },
            linktree: data.profile.linktree || {}
          }));
        setSearchResults(results);
      }
    } catch (error) {
      console.error('Error searching profiles:', error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleProfileClick = (accountId: string) => {
    navigate(`/profile/${accountId}`);
  };

  const displayProfiles = searchQuery ? searchResults : profiles;

  return (
    <section className="discover-section discover-people">
      <h2>discover people</h2>
      <div className="search-container mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search profiles..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="apps-grid">
        {loading ? (
          <div className="loading-indicator">Loading profiles...</div>
        ) : displayProfiles.length > 0 ? (
          displayProfiles.map((profile) => (
            <div
              key={profile.accountId}
              className="app-card"
              onClick={() => handleProfileClick(profile.accountId)}
            >
              <img
                src={profile.image?.url}
                alt={profile.name || profile.accountId}
                className="app-logo"
              />
              <p className="app-title">{profile.name || profile.accountId}</p>
            </div>
          ))
        ) : (
          <div className="no-results">
            {searchQuery ? 'No matching profiles found' : 'No profiles available'}
          </div>
        )}
      </div>
    </section>
  );
};

export default DiscoverPeople;