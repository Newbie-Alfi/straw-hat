import axios from "axios";
import { BaseAPI } from "./base";

const API_KEY = "99Gr8xP48j2t07JDigLZC4IXrRuM5PmD1pS84sUB";

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
