import { TokenPrice } from '@switcheo/types';
import BaseClient from './baseClient';
import { PATH_TOKEN_PRICES } from '@switcheo/constants';
import { TokenPriceSchema } from '@switcheo/types/schemas';
import { z } from 'zod';

export class TokenApi extends BaseClient {
  constructor(clientOptions = {}) {
    super(clientOptions);
  }

  getTokenPrices = async () => {
    const res = await this.client.get<TokenPrice[]>(`/${PATH_TOKEN_PRICES}`);

    const newRes = z.array(TokenPriceSchema).safeParse(res.data);
    if (!newRes.success) throw Error('Some thing went wrong');
    return newRes.data;
  };
}

const tokenApi = new TokenApi();

export default tokenApi;
