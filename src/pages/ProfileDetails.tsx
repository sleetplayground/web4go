import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/ProfileDetails.css';

interface SocialLinks {
  telegram?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

interface Profile {
  name?: string;
  image?: {
    url?: string;
  };
  linktree?: SocialLinks;
}

const ProfileDetails: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // TODO: Implement actual profile fetching using NEAR Social contract
        // This is a placeholder for now
        const mockProfile = {
          name: accountId,
          image: {
            url: 'https://via.placeholder.com/150'
          },
          linktree: {
            telegram: 'https://t.me/username',
            github: 'https://github.com/username',
            twitter: 'https://twitter.com/username',
            website: 'https://example.com'
          }
        };
        setProfile(mockProfile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (accountId) {
      fetchProfile();
    }
  }, [accountId]);

  if (loading) {
    return <div className="profile-loading">Loading...</div>;
  }

  if (!profile) {
    return <div className="profile-error">Profile not found</div>;
  }

  return (
    <div className="profile-details">
      <div className="profile-header">
        <img
          src={profile.image?.url || 'https://via.placeholder.com/150'}
          alt={profile.name || 'Profile'}
          className="profile-image"
        />
        <h1 className="profile-name">{profile.name || accountId}</h1>
      </div>

      <div className="social-links">
        {profile.linktree?.telegram && (
          <a href={profile.linktree.telegram} target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
        )}
        {profile.linktree?.github && (
          <a href={profile.linktree.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        )}
        {profile.linktree?.twitter && (
          <a href={profile.linktree.twitter} target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        )}
        {profile.linktree?.website && (
          <a href={profile.linktree.website} target="_blank" rel="noopener noreferrer">
            Website
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;