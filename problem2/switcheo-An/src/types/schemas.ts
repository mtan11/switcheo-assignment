import { z } from 'zod';

export const TokenPriceSchema = z.object({
  currency: z.string(),
  date: z.coerce.date(),
  price: z.number(),
});
