import { z } from 'zod';
import { TokenPriceSchema } from './schemas';

export type TokenPrice = z.infer<typeof TokenPriceSchema>;

export interface UserInfo {
  id: string;
  web3AuthWalletAddress: string;
  abstractAccountAddress: string;
  balance: number;
}
