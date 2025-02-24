import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApps } from '../context/AppsContext';
import '../css/AppDetails.css';

interface App {
  logo_url: string;
  title: string;
  oneliner: string;
  description: string;
  dapp_account_id: string;
  github?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
  medium?: string;
}

const AppDetails: React.FC = () => {
  const { dapp_account_id } = useParams();
  const [app, setApp] = useState<App | null>(null);
  const { mainnetApps, testnetApps } = useApps();
  const network = dapp_account_id?.endsWith('.testnet') ? 'testnet' : 'mainnet';
  const apps = network === 'testnet' ? testnetApps : mainnetApps;

  useEffect(() => {
    const foundApp = apps.find((app: App) => app.dapp_account_id === dapp_account_id);
    if (foundApp) {
      setApp(foundApp);
    } else {
      console.error('App not found');
    }
  }, [apps, dapp_account_id]);

  if (!app) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app-details-container">
      <div className="app-details-content">
        <img
          src={app.logo_url || 'https://via.placeholder.com/300'}
          alt={app.title}
          className="app-details-logo"
        />
        <h1 className="app-details-title">{app.title}</h1>
        <p className="app-details-oneliner">{app.oneliner}</p>
        <div className="app-details-description">
          {app.description}
        </div>
        <div className="app-details-links">
          {app.github && (
            <a href={app.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
          {app.twitter && (
            <a href={`https://twitter.com/${app.twitter}`} target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          )}
          {app.discord && (
            <a href={app.discord} target="_blank" rel="noopener noreferrer">
              Discord
            </a>
          )}
          {app.telegram && (
            <a href={app.telegram} target="_blank" rel="noopener noreferrer">
              Telegram
            </a>
          )}
          {app.medium && (
            <a href={app.medium} target="_blank" rel="noopener noreferrer">
              Medium
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppDetails;