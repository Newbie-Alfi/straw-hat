import { FC, useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { services } from '../../API';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

let labels;

export let data: any = {
  labels,
  datasets: [
    {
      label: 'AAPL',
      data: [],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

export const Instrument: FC = () => {
  const [chartData, setChartData] =
    useState<ChartData<'line', (number | null)[], unknown>>(data);

  const fetchData = async () => {
    const APIResult = await services.chart.get();
    labels = APIResult["AAPL"].timestamp;
    data.datasets[0].data.push( APIResult["AAPL"].close);
    setChartData(data)
};


  // useEffect(() => { fetchData() }, []);

  return <Line options={options} data={chartData} />;
};
