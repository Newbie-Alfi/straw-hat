import { BaseAPI } from './base';
import { YahooAPI } from './yahoo';

export class ChartAPI extends YahooAPI {
  constructor() {
    // TODO: передача парметров
    super('https://yfapi.net/v8/finance/chart/AAPL');
  }

  // TODO: передача парметров
  get = async () => {
    return await this._axios.get(this.url);
  };
}
