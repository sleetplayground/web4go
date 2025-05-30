import React, { useState } from 'react';
import '../css/SearchBar.css';

interface SearchBarProps {
  onSearch: (accountId: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const isTestnet = searchValue.endsWith('.testnet');
      const isMasterAccount = searchValue.split('.').length === 2; // e.g., "name.near" or "name.testnet"
      
      if (isMasterAccount) {
        // Redirect to the .page domain for master accounts
        const pageDomain = isTestnet ? 'testnet.page' : 'near.page';
        window.location.href = `https://${searchValue.split('.')[0]}.${pageDomain}`;
        return;
      }

      // Continue with IPFS gateway for subaccounts
      const baseUrl = isTestnet
        ? 'https://rpc.web4.testnet.page/account'
        : 'https://rpc.web4.near.page/account';
      const ipfsGateway = isTestnet
        ? 'https://ipfs.web4.testnet.page'
        : 'https://ipfs.web4.near.page';

      const response = await fetch(`${baseUrl}/${searchValue}/view/web4_get`);
      const result = await response.json();

      if (response.status === 404) {
        setError('Account not found');
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if the response indicates no web4 content
      if (result.error && result.error.includes('MethodResolveError')) {
        setError('No web4 content found for this account');
        return;
      }

      // Check for valid web4 content and construct gateway URL
      if (result.bodyUrl) {
        const ipfsUrl = result.bodyUrl.replace('ipfs://', '');
        const gatewayUrl = `${ipfsGateway}/ipfs/${ipfsUrl}`;
        onSearch(searchValue);
        window.location.href = gatewayUrl;
      } else {
        setError('Invalid web4 content format');
      }
    } catch (err) {
      setError('Error fetching web4 content: ' + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="discover-section">
      <h1 className="title">web4 go</h1>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="enter .near account...(works for subaccounts!)"
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'GO'}
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
      <div className="home-message">/ your gateway to web4</div>
    </section>
  );
};

export default SearchBar;