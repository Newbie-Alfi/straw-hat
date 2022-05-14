import { BaseAPI } from './base';
import { YahooAPI } from './yahoo';

export class SummaryAPI extends YahooAPI {
  constructor() {
    // TODO: передача парметров
    super('https://yfapi.net/v11/finance/quoteSummary/AAPL');
  }

  // TODO: передача парметров
  get = async () => {
    return await this._axios.get(this.url);
  };
}
