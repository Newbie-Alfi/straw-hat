import { FC, useLayoutEffect, useState } from 'react';
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
  ChartDataset,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { services } from '../../API';
import { CHART_DATA } from '../../utils/mock';
import { observer } from 'mobx-react-lite';
import { store } from '../../store';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartLine = ChartData<'line', (number | null)[], unknown>;

export const Instrument: FC = observer(() => {
  const [chartData, setChartData] = useState<ChartLine>();

  const { instruments } = store;
  const fetchData = async () => {
    const comparisionsToString = (instruments: string[]) => {
      let str = instruments.splice(1, instruments.length) + '';
      return str.replace(/,/, '%2C%5E');
    };

    try {
      // const response = await services.chart.get(
      //   instruments.comparedInstruments[0],
      //   {
      //     comparisons: comparisionsToString(instruments.comparedInstruments),
      //     range: '1y',
      //     region: 'US',
      //     interval: '1d',
      //     lang: 'en',
      //     events: 'div%2Csplit',
      //   }
      // );
      const response = CHART_DATA;
      const result = response.chart.result[0];
      let labels = result.timestamp.map((ts: number) =>
        new Date(ts).toLocaleDateString('ru-RU')
      );
      let mainCharData = {
        price: result.indicators.quote[0].close,
        symbol: result.meta.symbol,
      };
      let comparisonsData = result.comparisons.map((comparison) => ({
        price: comparison.open,
        symbol: comparison.symbol,
      }));
      let data = [mainCharData, ...comparisonsData];
      let dataSets = data.map((chart) => ({
        label: chart.symbol,
        data: chart.price,
        borderColor: `${Math.floor(Math.random()*16777215).toString(16)}`,
        backgroundColor: `${Math.floor(Math.random()*16777215).toString(16)}`,
      }));

      let charData: ChartLine = {
        labels: labels,
        datasets: dataSets,
      };

      setChartData(charData);
    } catch (e) {
    } finally {
    }
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  if (chartData) {
    return (
      <Line
        options={{
          responsive: true,
        }}
        data={chartData}
      />
    );
  } else {
    return <p>loading...</p>;
  }
});
