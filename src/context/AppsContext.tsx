import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface App {
  title: string;
  dapp_account_id: string;
  categories: number[];
  slug: string;
  oneliner: string;
  description: string;
  logo_url?: string;
  twitter?: string;
  facebook?: string;
  medium?: string;
  telegram?: string;
  github?: string;
  discord?: string;
}

interface AppsContextType {
  mainnetApps: App[];
  testnetApps: App[];
  loading: boolean;
  error: string | null;
  network: 'mainnet' | 'testnet';
  setNetwork: (network: 'mainnet' | 'testnet') => void;
}

const AppsContext = createContext<AppsContextType | undefined>(undefined);

export function AppsProvider({ children }: { children: ReactNode }) {
  const [mainnetApps, setMainnetApps] = useState<App[]>([]);
  const [testnetApps, setTestnetApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [network, setNetwork] = useState<'mainnet' | 'testnet'>('mainnet');

  const fetchApps = async (isTestnet: boolean) => {
    try {
      const contractId = isTestnet ? 'awesomeweb4.testnet' : 'awesomeweb4.near';
      const rpcEndpoint = isTestnet ? 'https://rpc.web4.testnet.page' : 'https://rpc.web4.near.page';
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
      
      if (isTestnet) {
        setTestnetApps(apps);
      } else {
        setMainnetApps(apps);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch apps');
    }
  };

  useEffect(() => {
    const loadApps = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch both networks' data initially
        await Promise.all([
          fetchApps(false), // mainnet
          fetchApps(true)  // testnet
        ]);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch apps');
      } finally {
        setLoading(false);
      }
    };

    loadApps();
  }, []);

  const value = {
    mainnetApps,
    testnetApps,
    loading,
    error,
    network,
    setNetwork
  };

  return <AppsContext.Provider value={value}>{children}</AppsContext.Provider>;
}

export function useApps() {
  const context = useContext(AppsContext);
  if (context === undefined) {
    throw new Error('useApps must be used within an AppsProvider');
  }
  return context;
}