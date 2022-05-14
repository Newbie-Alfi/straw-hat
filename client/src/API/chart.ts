import { BaseAPI } from './base';
import { YahooAPI } from './yahoo';

interface Stock {}

export class ChartAPI extends YahooAPI {
  constructor() {
    // TODO: передача парметров
    super('/v8/finance/chart/AAPL');
  }
  // TODO: передача парметров
  get = async () => {
    const { data } = await this._axios.get(this.url, {
      params: {
        comparisons: 'MSFT%2C%5EVIX',
        range: '1y',
        region: 'US',
        interval: '1d',
        lang: 'en',
        events: 'div%2Csplit',
      },
    });
    console.log(data);
    return data;
  };
}
