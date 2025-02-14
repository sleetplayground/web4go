import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onContentUrlFound: (url: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onContentUrlFound }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const isTestnet = searchValue.endsWith('.testnet');
      const baseUrl = isTestnet
        ? 'https://rpc.web4.testnet.page/account'
        : 'https://rpc.web4.near.page/account';
      const ipfsGateway = isTestnet
        ? 'https://ipfs.web4.testnet.page'
        : 'https://ipfs.web4.near.page';

      const response = await fetch(`${baseUrl}/${searchValue}/view/web4_get`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();

      if (result && result.result && result.result.bodyUrl) {
        const ipfsUrl = result.result.bodyUrl.replace('ipfs://', '');
        const gatewayUrl = `${ipfsGateway}/ipfs/${ipfsUrl}`;
        onContentUrlFound(gatewayUrl);
      } else {
        setError('No web4 content found for this account');
      }
    } catch (err) {
      setError('Error fetching web4 content: ' + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Enter NEAR account or IPFS hash..."
        className="search-input"
      />
      <button type="submit" className="search-button" disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};

export default SearchBar;