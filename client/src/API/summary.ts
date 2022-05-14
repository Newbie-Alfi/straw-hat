import { YahooAPI } from './yahoo';

export class SummaryAPI extends YahooAPI {
  constructor() {
    // TODO: передача парметров
    super('/v11/finance/quoteSummary/');
  }

  // TODO: передача парметров
  get = async (ticket: string) => {
    return await this._axios.get(this.url + ticket);
  };
}
