import axios, { AxiosInstance, CancelTokenSource } from 'axios';
import { BASE_URL } from '@switcheo/constants';

export default class BaseClient {
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
