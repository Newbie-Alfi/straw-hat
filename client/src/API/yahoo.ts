import axios from "axios";
import { BaseAPI } from "./base";

const API_KEY =
  "t.-cb4YvK-KgMROCdK8Sq9ScP27kXN7MF_cEh6qstgZJoTX-61gVryXFalRBRqjgx2TkWkVGcTW8To3H2Si9TjGA";

export abstract class YahooAPI extends BaseAPI {
  protected _axios = axios.create({
    headers: {
      accept: "application/json",
      "x-api-key": API_KEY,
    },
  });

  constructor(url: string) {
    super("https://yfapi.net" + url);
  }
}
