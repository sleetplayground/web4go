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
  const { dapp_account_id } = useParams();
  const [app, setApp] = useState<App | null>(null);
  const network = dapp_account_id?.endsWith('.testnet') ? 'testnet' : 'mainnet';

  useEffect(() => {
    const fetchAppDetails = async () => {
      try {
        const contractId = network === 'testnet' ? 'awesomeweb4.testnet' : 'awesomeweb4.near';
        const rpcEndpoint = network === 'testnet' ? 'https://rpc.web4.testnet.page' : 'https://rpc.web4.near.page';
        const response = await fetch(rpcEndpoint, {
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
              method_name: 'get_apps',
              args_base64: btoa(JSON.stringify({ from_index: 0, limit: 100 }))
            }
          })
        });
        const data = await response.json();
        const result = JSON.parse(Buffer.from(data.result.result).toString());
        const apps = result.map((app: [number, App]) => app[1]);
        const foundApp = apps.find((app: App) => app.dapp_account_id === dapp_account_id);
        
        if (foundApp) {
          setApp(foundApp);
        } else {
          console.error('App not found');
        }
      } catch (error) {
        console.error('Error fetching app details:', error);
      }
    };

    if (dapp_account_id) {
      fetchAppDetails();
    }
  }, [dapp_account_id, network]);

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