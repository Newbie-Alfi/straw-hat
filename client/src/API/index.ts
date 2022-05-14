import axios from "axios";

export const api = axios.create({
  baseURL:
    "https://yfapi.net/v8/finance/chart/AAPL?comparisons=MSFT%2C%5EVIX&range=1mo&region=US&interval=1d&lang=en&events=div%2Csplit",
  timeout: 1000,
  headers: {
    "X-API-KEY": "0THJCRvny24mtnF7JiUMw4UiGNxydsmp3QSEQOxl",
    accept: "application/json",
  },
});
