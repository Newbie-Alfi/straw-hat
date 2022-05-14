import axios, { AxiosInstance } from 'axios';
import { BaseAPI } from './base';

const API_KEY = 'Uj9N1l0oyE7wROkZs0mWW7QSok40kNzd5mwv65Jh';
export abstract class YahooAPI extends BaseAPI {
  protected _axios = axios.create({
    headers: {
      'x-api-key': API_KEY,
    },
  });

  constructor(url: string) {
    super(url);
  }
}
