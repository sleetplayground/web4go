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
  tags?: string[];
}

const nearSocialApi = new Social({
  network: 'mainnet',
  contractName: 'social.near',
  nodeUrl: 'https://rpc.mainnet.near.org',
  apiUrl: 'https://api.near.social/api/v1'
});

const DiscoverPeople: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver>();
  const loadingRef = useRef<HTMLDivElement>(null);

  const BATCH_SIZE = 12;

  const loadMoreProfiles = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    setError(null);
    try {
      const start = page * BATCH_SIZE;

      // Fetch profiles with proper error handling
      let response;
      try {
        response = await nearSocialApi.get({
          keys: [`*/profile/**`],
          options: {
            limit: BATCH_SIZE,
            order: 'desc',
            from: start,
            subscribe: false
          }
        });
      } catch (apiError) {
        console.error('API Error:', apiError);
        throw new Error('Failed to fetch profiles from NEAR Social API');
      }

      if (!response || typeof response !== 'object') {
        setHasMore(false);
        return;
      }

      // Transform response into profiles
      const newProfiles = Object.entries(response)
        .filter(([accountId, data]: [string, any]) => data?.profile)
        .map(([accountId, data]: [string, any]) => ({
          accountId,
          name: data.profile.name || accountId,
          image: {
            url: data.profile.image?.url || 'https://via.placeholder.com/150'
          },
          tags: Array.isArray(data.profile.tags) ? data.profile.tags : []
        }));

      if (newProfiles.length === 0) {
        setHasMore(false);
        return;
      }

      setProfiles(prev => {
        const uniqueProfiles = [...prev];
        newProfiles.forEach(profile => {
          const existingIndex = uniqueProfiles.findIndex(p => p.accountId === profile.accountId);
          if (existingIndex === -1) {
            uniqueProfiles.push(profile);
          }
        });
        return uniqueProfiles;
      });
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      setError(error instanceof Error ? error.message : 'Failed to load profiles');
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  useEffect(() => {
    const currentObserver = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreProfiles();
        }
      },
      { threshold: 1.0 }
    );

    if (loadingRef.current) {
      currentObserver.observe(loadingRef.current);
    }

    observer.current = currentObserver;

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loadMoreProfiles, hasMore]);

  useEffect(() => {
    loadMoreProfiles();
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
            key={`${profile.accountId}-${index}`}
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
      {error && <div className="error-message">{error}</div>}
      {hasMore && (
        <div ref={loadingRef} className="loading-indicator">
          {loading ? 'Loading more profiles...' : 'Scroll for more'}
        </div>
      )}
    </section>
  );
};

export default DiscoverPeople;