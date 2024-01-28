import { IMAGE_BASE_URL, SPECIAL_TOKEN_NAMES } from '@switcheo/constants';
import { TokenPrice } from '@switcheo/types';
import { AxiosError } from 'axios';
import { z } from 'zod';

export const getIconByName = (tokenName: string) => {
  const specialName = SPECIAL_TOKEN_NAMES[tokenName];
  if (specialName) return `${IMAGE_BASE_URL}/${specialName}.svg`;
  if (tokenName) return `${IMAGE_BASE_URL}/${tokenName}.svg`;
  return tokenName;
};

export const calculateSwapResult = (
  payPrice: number,
  receivePrice: number,
  amount: number
): number => {
  if (!receivePrice) return 0;
  const result = (amount * payPrice) / receivePrice;
  return Number.parseFloat(result.toFixed(2)) || 0;
};

export const removeDuplicatesByLatestDate = (
  items: TokenPrice[]
): TokenPrice[] => {
  const deduplicatedItems = items.reduce((uniqueItems, currentItem) => {
    const existingItemIndex = uniqueItems.findIndex(
      (item) => item.currency === currentItem.currency
    );
    if (existingItemIndex === -1) {
      uniqueItems.push(currentItem);
    } else {
      const existingItem = uniqueItems[existingItemIndex];
      if (new Date(currentItem.date) > new Date(existingItem.date)) {
        uniqueItems[existingItemIndex] = currentItem;
      }
    }

    return uniqueItems;
  }, [] as TokenPrice[]);

  return deduplicatedItems;
};

export const formattedNumber = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

interface CustomError {
  name: string;
  message: string;
}

export const getErrorMessage = (error: unknown): CustomError => {
  if (error instanceof z.ZodError) {
    return {
      name: 'Error',
      message: 'Something went wrong with Server. Please try again later',
    };
  }

  if (error instanceof Error || (error as AxiosError).isAxiosError) {
    console.error(error);
    return error as CustomError;
  }
  console.error('Unexpected error type:', error);
  return {
    name: 'Error',
    message: 'Something went wrong. Please try again later',
  };
};
