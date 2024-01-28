import { ZodIssue, z } from 'zod';
import {
  calculateSwapResult,
  formattedNumber,
  getErrorMessage,
  getIconByName,
  removeDuplicatesByLatestDate,
} from '../helper';
import { IMAGE_BASE_URL } from '@switcheo/constants';

describe('Utility Functions', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('getIconByName', () => {
    it('returns the correct icon URL for a token name', () => {
      const result = getIconByName('ETH');
      expect(result).toEqual(`${IMAGE_BASE_URL}/ETH.svg`);
    });

    it('returns the correct icon URL for a special token name', () => {
      const result = getIconByName('specialToken');
      expect(result).toEqual(`${IMAGE_BASE_URL}/specialToken.svg`);
    });

    it('returns the token name if no match is found', () => {
      const result = getIconByName('');
      expect(result).toEqual('');
    });
  });

  describe('calculateSwapResult', () => {
    it('calculates swap result correctly', () => {
      const payPrice = 5;
      const receivePrice = 2;
      const amount = 10;
      const result = calculateSwapResult(payPrice, receivePrice, amount);
      expect(result).toEqual(25);
    });

    it('returns 0 if receivePrice is 0', () => {
      const payPrice = 5;
      const receivePrice = 0;
      const amount = 10;
      const result = calculateSwapResult(payPrice, receivePrice, amount);
      expect(result).toEqual(0);
    });
  });

  describe('removeDuplicatesByLatestDate', () => {
    it('removes duplicates and keeps the latest by date', () => {
      const items = [
        {
          currency: 'ETH',
          date: new Date('2023-08-29T07:10:50.000Z'),
          price: 100,
        },
        {
          currency: 'ETH',
          date: new Date('2023-09-29T07:10:50.000Z'),
          price: 120,
        },
        {
          currency: 'BTC',
          date: new Date('2023-08-29T07:10:50.000Z'),
          price: 2000,
        },
      ];

      const result = removeDuplicatesByLatestDate(items);

      expect(result).toHaveLength(2);
      expect(result).toEqual([
        {
          currency: 'ETH',
          date: new Date('2023-09-29T07:10:50.000Z'),
          price: 120,
        },
        {
          currency: 'BTC',
          date: new Date('2023-08-29T07:10:50.000Z'),
          price: 2000,
        },
      ]);
    });

    it('handles an empty array', () => {
      const result = removeDuplicatesByLatestDate([]);
      expect(result).toEqual([]);
    });
  });

  describe('formattedNumber', () => {
    it('formats a number as currency', () => {
      const result = formattedNumber(1000);
      expect(result).toEqual('$1,000.00');
    });
  });

  describe('getErrorMessage', () => {
    it('should handle ZodError and return custom error message', () => {
      const zodError = new z.ZodError([
        { message: 'Some Zod error', fatal: true } as ZodIssue,
      ]);

      const result = getErrorMessage(zodError);
      expect(result).toEqual({
        name: 'Error',
        message: 'Something went wrong with Server. Please try again later',
      });
    });

    it('should handle AxiosError and return the error object', () => {
      const axiosError = {
        name: 'AxiosError',
        message: 'Some AxiosError message',
        isAxiosError: true,
      };
      const result = getErrorMessage(axiosError);
      expect(result).toEqual(axiosError);
    });

    it('should handle generic Error and return the error object', () => {
      const genericError = new Error('Some generic error message');
      const result = getErrorMessage(genericError);
      expect(result).toEqual(genericError);
    });

    it('should handle unexpected error type and return custom error message', () => {
      const unknownError = 'Some unknown error';
      const result = getErrorMessage(unknownError);
      expect(result).toEqual({
        name: 'Error',
        message: 'Something went wrong. Please try again later',
      });
    });
  });
});
