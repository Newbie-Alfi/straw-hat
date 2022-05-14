// import { FC, useEffect, useState } from 'react';
// import { services } from '../../API';
// import { Line } from 'react-chartjs-2';
// import yahoo from 'yahoo-finance2';

// const API_KEY = 'Uj9N1l0oyE7wROkZs0mWW7QSok40kNzd5mwv65Jh';
// export const Instrument: FC = () => {
//   const [summary, setSummary] = useState();

//   const c = async () => {
//     const results = await yahoo.quoteSummary('AAPL', { modules: ['price'] });
//     console.log(results);
//   };

//   useEffect(() => {
//     c();
//   }, []);

//   const data = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     datasets: [
//       {
//         label: 'My First dataset',
//         fill: false,
//         lineTension: 0.1,
//         backgroundColor: 'rgba(75,192,192,0.4)',
//         borderColor: 'rgba(75,192,192,1)',
//         borderCapStyle: 'butt',
//         borderDash: [],
//         borderDashOffset: 0.0,
//         borderJoinStyle: 'miter',
//         pointBorderColor: 'rgba(75,192,192,1)',
//         pointBackgroundColor: '#fff',
//         pointBorderWidth: 1,
//         pointHoverRadius: 5,
//         pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//         pointHoverBorderColor: 'rgba(220,220,220,1)',
//         pointHoverBorderWidth: 2,
//         pointRadius: 1,
//         pointHitRadius: 10,
//         data: [65, 59, 80, 81, 56, 55, 40],
//       },
//     ],
//   };

//   return <></>;
// };

import React, { FC, useEffect, useState } from 'react';
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
    useState<ChartData<'line', (number | null)[], unknown>>();

  const getChartData = async () => {
    se
    setChartData();
  };

  useEffect(() => {}, []);

  return <Line options={options} data={chartData} />;
};
