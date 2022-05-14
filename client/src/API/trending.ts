import { BaseAPI } from "./base";
import { YahooAPI } from "./yahoo";

interface Stock {}

export class TrendingAPI extends YahooAPI {
  constructor() {
    // TODO: передача парметров
    super("/v1/finance/trending/");
  }
  // TODO: передача парметров
  get = async (region: string) => {
    const { data } = await this._axios.get(this.url + region);
    console.log(data);
    return data;
  };
}
