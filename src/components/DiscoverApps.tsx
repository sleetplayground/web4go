import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Discover.css';

interface App {
  logo_url: string;
  title: string;
  slug: string;
  dapp_account_id: string;
}

const DiscoverApps: React.FC = () => {
  const [apps, setApps] = useState<App[]>([]);
  const [network, setNetwork] = useState<'testnet' | 'mainnet'>('mainnet');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApps = async () => {
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
              method_name: 'get_apps',
              args_base64: btoa(JSON.stringify({ from_index: 0, limit: 100 }))
            }
          })
        });
        const data = await response.json();
        const result = JSON.parse(Buffer.from(data.result.result).toString());
        setApps(result.map((app: [number, App]) => app[1]));
      } catch (error) {
        console.error('Error fetching apps:', error);
      }
    };

    fetchApps();
  }, [network]);

  const handleAppClick = (slug: string) => {
    navigate(`/apps/${slug}`);
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
            onClick={() => handleAppClick(app.slug)}
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