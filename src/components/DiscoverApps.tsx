import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApps } from '../context/AppsContext';
import '../css/Discover.css';

interface App {
  logo_url: string;
  title: string;
  slug: string;
  dapp_account_id: string;
}

const DiscoverApps: React.FC = () => {
  const [network, setNetwork] = useState<'testnet' | 'mainnet'>('mainnet');
  const navigate = useNavigate();
  const { mainnetApps, testnetApps } = useApps();
  const apps = network === 'testnet' ? testnetApps : mainnetApps;

  const handleAppClick = (dapp_account_id: string) => {
    navigate(`/apps/${dapp_account_id}`);
  };

  return (
    <section className="discover-section discover-apps">
      <h2>discover web4 apps</h2>
      <div className="network-toggle">
        <button
          className={network === 'testnet' ? 'active' : ''}
          onClick={() => setNetwork('testnet')}
        >
          Testnet
        </button>
        <button
          className={network === 'mainnet' ? 'active' : ''}
          onClick={() => setNetwork('mainnet')}
        >
          Mainnet
        </button>
      </div>
      <div className="apps-grid">
        {apps.map((app, index) => (
          <div
            key={index}
            className="app-card"
            onClick={() => handleAppClick(app.dapp_account_id)}
          >
            <img
              src={app.logo_url || 'https://via.placeholder.com/150'}
              alt={app.title}
              className="app-logo"
            />
            <p className="app-title">{app.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DiscoverApps;