import React, { useState } from 'react';
import './SearchBar.css';
import * as nearAPI from 'near-api-js';

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
      const nearConnection = await nearAPI.connect({
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() }
      });

      const account = await nearConnection.account(searchValue);
      const result = await account.viewFunction(searchValue, 'web4_get', {});

      if (result && result.bodyUrl) {
        const ipfsUrl = result.bodyUrl.replace('ipfs://', '');
        const gatewayUrl = `https://ipfs.web4.testnet.page/ipfs/${ipfsUrl}`;
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
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;