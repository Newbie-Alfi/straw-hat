import { BaseAPI } from "./base";
import { YahooAPI } from "./yahoo";

interface Stock {}

export class ChartAPI extends YahooAPI {
  constructor() {
    // TODO: передача парметров
    super("https://yfapi.net/v8/finance/spark");
  }
  // TODO: передача парметров
  get = async () => {
    const { data } = await this._axios.get(this.url, {
      params: {
        interval: "1d",
        range: "1mo",
        symbols: "AAPL",
      },
    });
    console.log(data);
    return data;
  };
}
