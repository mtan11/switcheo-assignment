import React, { FC, useEffect, useMemo, useState } from 'react';
import axios, { AxiosInstance, CancelTokenSource } from 'axios';
import { z } from 'zod';
import { BASE_URL } from '@switcheo/constants';

// schemas.ts
const TokenPriceSchema = z.object({
  currency: z.string(),
  date: z.coerce.date(),
  price: z.number(),
});

// types/index.ts
type TokenPrice = z.infer<typeof TokenPriceSchema>;
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

// services/baseClient.ts
class BaseClient {
  client: AxiosInstance;
  source: CancelTokenSource;

  constructor(clientOptions = {}) {
    // Merge default options with the provided options
    const defaultOptions = {
      baseURL: BASE_URL,
      timeout: 15_000,
      headers: {
        'Content-Type': 'application/json',
      },
      ...clientOptions,
    };

    // Create an Axios instance with the merged options
    this.client = axios.create(defaultOptions);

    // Create a cancel token source
    this.source = axios.CancelToken.source();
  }
}
// services/Datasource.ts
class DatasourceApi extends BaseClient {
  constructor(clientOptions = {}) {
    super(clientOptions);
  }

  getPrices = async () => {
    const res = await this.client.get<TokenPrice[]>(`/${PATH_TOKEN_PRICES}`);

    const newRes = z.array(TokenPriceSchema).safeParse(res.data);
    if (!newRes.success) throw Error('Some thing went wrong');
    return newRes.data;
  };
}
const datasourceApi = new DatasourceApi({ baseURL: "https://interview.switcheo.com/prices.json" });

// constants/index.ts
const blockchainPriority: { [key: string]: number } = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20
}

// utils/tokenHelper.ts
const getPriority = (blockchain: string): number => {
  const priority = blockchainPriority[blockchain]
  if (priority) return priority;
  return -99
}

// utils/tokenHelper.ts
const formatWalletBalances = (walletBalances: WalletBalance[]): FormattedWalletBalance[] => {
  return walletBalances.map((balance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })
}

// hooks/usePrices.ts
const usePrices = () => {
  const [prices, setPrices] = useState<TokenPrice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      setIsLoading(true);
      setIsError(false);
      setPrices([])
      try {
        const fetchedPrices = await datasourceApi.getPrices();
        if (!ignore) {
          setPrices(fetchedPrices);
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    let ignore = false;
    fetchPrices();
    return () => {
      ignore = true;
    }
  }, []);

  return { prices, isLoading, isError };
};


interface WalletPageProps extends BoxProps {

}

const WalletPage: FC<WalletPageProps> = (props: WalletPageProps) => {
  const { ...rest } = props;
  const balances: WalletBalance[] = useWalletBalances(); // Assume this hook will return a list WalletBalance
  const { prices, isLoading, isError} = usePrices();

  const sortedBalances: FormattedWalletBalance[] = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.currency);
      return balancePriority > -99 && balance.amount <= 0;
    }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.currency);
      const rightPriority = getPriority(rhs.currency);
      // First, sort by priority
      if (leftPriority !== rightPriority) {
        return leftPriority - rightPriority;
      }

      // If priorities are the same, then sort by amount (ascending)
      return lhs.amount - rhs.amount;
    });
  }, [balances]);

  const rows = useMemo(() => {
    if (sortedBalances.length === 0) return <div>No wallet</div>;
    const formattedBalances = formatWalletBalances(sortedBalances);
    return formattedBalances.map((balance: FormattedWalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={`${balance.currency}-${balance.formatted}`}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    })
  }, [sortedBalances, prices])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if(isError) {
    return <div>Something went wrong!</div>
  }

  return <div {...rest}>
    {rows}
  </div>
}


export default WalletPage;