import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/AppDetails.css';

interface App {
  logo_url: string;
  title: string;
  slug: string;
  dapp_account_id: string;
  description: string;
  oneliner: string;
  github: string;
  twitter: string;
  discord: string;
  telegram: string;
  medium: string;
}

const AppDetails: React.FC = () => {
  const { slug } = useParams();
  const [app, setApp] = useState<App | null>(null);
  const [network, setNetwork] = useState<'testnet' | 'mainnet'>('testnet');

  useEffect(() => {
    const fetchAppDetails = async () => {
      try {
        const contractId = `awesomeweb4.${network}`;
        const response = await fetch(`https://rpc.${network}.near.org`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'dontcare',
            method: 'query',
            params: {
              request_type: 'call_function',
              finality: 'final',
              account_id: contractId,
              method_name: 'get_app_by_slug',
              args_base64: btoa(JSON.stringify({ slug }))
            }
          })
        });
        const data = await response.json();
        const result = JSON.parse(Buffer.from(data.result.result).toString());
        setApp(result);
      } catch (error) {
        console.error('Error fetching app details:', error);
      }
    };

    if (slug) {
      fetchAppDetails();
    }
  }, [slug, network]);

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