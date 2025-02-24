import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApps } from '../context/AppsContext';
import type { App } from '../context/AppsContext';
import '../css/AppDetails.css';

const AppDetails: React.FC = () => {
  const { dapp_account_id } = useParams();
  const [app, setApp] = useState<App | null>(null);
  const { mainnetApps, testnetApps } = useApps();
  const network = dapp_account_id?.endsWith('.testnet') ? 'testnet' : 'mainnet';
  const apps = network === 'testnet' ? testnetApps : mainnetApps;

  useEffect(() => {
    if (!dapp_account_id) return;
    const foundApp = apps.find(app => app.dapp_account_id === dapp_account_id);
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
    <>
      <div className="back-link-container">
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
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
            <a
              href={`https://${dapp_account_id?.split('.')[0]}.${network === 'testnet' ? 'testnet.page' : 'near.page'}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Web4 Page
            </a>
            {app.github && (
              <a href={`https://github.com/${app.github}`} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
            {app.twitter && (
              <a href={`https://twitter.com/${app.twitter}`} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            )}
            {app.discord && (
              <a href={`https://discord.gg/${app.discord}`} target="_blank" rel="noopener noreferrer">
                Discord
              </a>
            )}
            {app.telegram && (
              <a href={`https://t.me/${app.telegram}`} target="_blank" rel="noopener noreferrer">
                Telegram
              </a>
            )}
            {app.medium && (
              <a href={`https://medium.com/${app.medium}`} target="_blank" rel="noopener noreferrer">
                Medium
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppDetails;