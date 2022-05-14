import { YahooAPI } from './yahoo';

interface ChartParams {
  comparisons?: string[];
  range: string;
  region: string;
  interval: string;
  lang: string;
  events: string;
}

export class ChartAPI extends YahooAPI {
  constructor() {
    super('/v8/finance/chart/');
  }

  get = async (ticker: string = 'AAPL', params: ChartParams) => {
    const { data } = await this._axios.get(this.url + ticker, {
      params: params,
    });

    return data;
  };
}
