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
}

const nearSocialApi = new Social({
  network: 'mainnet'
});

const DiscoverPeople: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver>();
  const loadingRef = useRef<HTMLDivElement>(null);

  const BATCH_SIZE = 6;
  const allAccounts = [
    'petarvujovic.near',
    'mob.near',
    'zavodil.near',
    'root.near',
    'nearweek.near',
    'mintbase.near',
    'calebjacob.near',
    'james.near',
    'microchipgnu.near',
    'ndcplug.near',
    'eugenethedream.near',
    'markeljan.near',
    'shemar.near',
    'sarahkornfeld.near',
    'jlw.near'
  ];

  const loadMoreProfiles = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      const start = page * BATCH_SIZE;
      const end = start + BATCH_SIZE;
      const currentBatch = allAccounts.slice(start, end);

      if (currentBatch.length === 0) {
        setHasMore(false);
        return;
      }

      const fetchedProfiles = await nearSocialApi.get({
        keys: currentBatch.map(account => `${account}/profile/*`)
      });
      
      const formattedProfiles = Object.entries(fetchedProfiles || {}).map(([accountId, data]: [string, any]) => ({
        accountId,
        name: data?.profile?.name || accountId,
        image: {
          url: data?.profile?.image?.url || 'https://via.placeholder.com/150'
        }
      }));

      setProfiles(prev => [...prev, ...formattedProfiles]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching profiles:', error);
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
      {hasMore && (
        <div ref={loadingRef} className="loading-indicator">
          {loading ? 'Loading more profiles...' : ''}
        </div>
      )}
    </section>
  );
};

export default DiscoverPeople;