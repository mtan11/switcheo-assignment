import axios, { AxiosResponse } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import BaseClient from '../baseClient';
import { BASE_URL } from '@switcheo/constants';

describe('BaseClient', () => {
  let baseClient: BaseClient;
  let axiosMock: MockAdapter;

  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
    baseClient = new BaseClient();
  });

  afterEach(() => {
    axiosMock.reset();
  });

  it('creates an Axios instance with default options', () => {
    expect(baseClient.client.defaults.baseURL).toBe(BASE_URL);
    expect(baseClient.client.defaults.timeout).toBe(15_000);
    expect(baseClient.client.defaults.headers['Content-Type']).toBe(
      'application/json'
    );
  });

  it('makes a successful GET request', async () => {
    const responseData = { key: 'value' };
    axiosMock.onGet('/example').reply(200, responseData);

    const response: AxiosResponse = await baseClient.client.get('/example');

    expect(response.status).toBe(200);
    expect(response.data).toEqual(responseData);
  });

  it('handles an error response', async () => {
    axiosMock.onGet('/error').reply(404, { message: 'Not Found' });

    await expect(baseClient.client.get('/error')).rejects.toThrow(
      'Request failed with status code 404'
    );
  });
});
