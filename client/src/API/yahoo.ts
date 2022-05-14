import axios from 'axios';
import { BaseAPI } from './base';

const API_KEY = 'ebavuPt4Wx92MOSlNImn75G6KjgrVvmmauotKXhv';
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
