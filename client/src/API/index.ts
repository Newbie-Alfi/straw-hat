import axios from 'axios';
import { ChartAPI } from './chart';
import { SummaryAPI } from './summary';

export const services = {
  summary: new SummaryAPI(),
  chart: new ChartAPI(),
};
