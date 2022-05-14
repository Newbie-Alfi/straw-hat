import axios from "axios";
import { ChartAPI } from "./chart";
import { SummaryAPI } from "./summary";
import { TrendingAPI } from "./trending";

export const services = {
  summary: new SummaryAPI(),
  chart: new ChartAPI(),
  trending: new TrendingAPI(),
};
