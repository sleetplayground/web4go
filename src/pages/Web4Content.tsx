import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Web4ContentProps {
  onContentUrlFound?: (url: string) => void;
}

const Web4Content = ({ onContentUrlFound }: Web4ContentProps) => {
  const { accountId } = useParams<{ accountId: string }>();
  const [contentUrl, setContentUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchContent = async () => {
      if (!accountId) return;

      try {
        const isTestnet = accountId.endsWith('.testnet');
        const baseUrl = isTestnet
          ? 'https://rpc.web4.testnet.page/account'
          : 'https://rpc.web4.near.page/account';
        const ipfsGateway = isTestnet
          ? 'https://ipfs.web4.testnet.page'
          : 'https://ipfs.web4.near.page';

        // First fetch the IPFS hash from the account
        const response = await fetch(`${baseUrl}/${accountId}/view/web4_get`);
        const result = await response.json();

        if (response.status === 404) {
          throw new Error('Account not found');
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (result.error && result.error.includes('MethodResolveError')) {
          throw new Error('No web4 content found for this account');
        }

        if (!result.bodyUrl) {
          throw new Error('Invalid web4 content format');
        }

        // Convert IPFS URL to gateway URL and fetch content
        const ipfsUrl = result.bodyUrl.replace('ipfs://', '');
        const gatewayUrl = `${ipfsGateway}/ipfs/${ipfsUrl}`;
        const contentResponse = await fetch(gatewayUrl);
        if (!response.ok) throw new Error('Failed to fetch content');
        
        setContentUrl(gatewayUrl);
        onContentUrlFound?.(gatewayUrl);
        
        // Open the content in a new tab
        window.open(gatewayUrl, '_blank');
      } catch (err) {
        setError('Failed to load content. Please try again.');
        console.error('Error fetching content:', err);
      }
    };

    fetchContent();
  }, [accountId, onContentUrlFound]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="web4-content-container">
      <div className="web4-content-wrapper">
        <Link to="/" className="home-link">Back to Home</Link>
        {!error && !contentUrl && <div className="loading-container">Loading content...</div>}
        {contentUrl && (
          <div className="redirect-message">
            Content has been opened in a new tab.<br/>If it didn't open, 
            <a href={contentUrl} target="_blank" rel="noopener noreferrer">click here</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Web4Content;