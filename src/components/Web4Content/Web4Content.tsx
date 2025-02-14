import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
        
        // Instead of fetching the content, we'll use the gateway URL directly
        setContentUrl(gatewayUrl);
        onContentUrlFound?.(gatewayUrl);
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

  useEffect(() => {
    if (contentUrl) {
      window.location.href = contentUrl;
    }
  }, [contentUrl]);

  return (
    <div className="loading-container">
      {!error && !contentUrl && <div>Loading content...</div>}
    </div>
  );
};

export default Web4Content;