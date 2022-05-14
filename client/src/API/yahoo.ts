import axios from 'axios';
import { BaseAPI } from './base';

const API_KEY = '0THJCRvny24mtnF7JiUMw4UiGNxydsmp3QSEQOxl';
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
