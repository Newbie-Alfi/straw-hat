import axios from 'axios';
import { BaseAPI } from './base';

const API_KEY = 'ynptyMyPNL4pwgxSESGvj6JT7HV3uJrQEm7N4Sc1';

export abstract class YahooAPI extends BaseAPI {
  protected _axios = axios.create({
    headers: {
      accept: 'application/json',
      'x-api-key': API_KEY,
    },
  });

  constructor(url: string) {
    super('https://yfapi.net' + url);
  }
}
