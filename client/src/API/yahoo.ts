import axios from "axios";
import { BaseAPI } from "./base";

const API_KEY = "q8aqob6KYm72mML6UJBZZ71lkfey1zD6d8611Egg";

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
