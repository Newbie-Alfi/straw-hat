import axios from 'axios';
import { BaseAPI } from './base';

const API_KEY = 'Fj04Q2z23a9fipsjOVj3p3VLpB6ZFyvudXcOvNS2';
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
