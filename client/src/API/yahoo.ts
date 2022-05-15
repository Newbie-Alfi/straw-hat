import axios from "axios";
import { BaseAPI } from "./base";

const API_KEY = "x8B2nTjhMSgt0N6SVdlwarNujqYMmCW4kBLguJb0";

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
