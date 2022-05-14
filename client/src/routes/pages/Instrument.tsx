import { FC, useLayoutEffect, useState } from "react";
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
} from "chart.js";
import { Line } from "react-chartjs-2";
import { services } from "../../API";

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

export const Instrument: FC = () => {
  const [chartData, setChartData] = useState<ChartLine>();

  const fetchData = async () => {
    try {
      const response = await services.chart.get();
      const result = response.chart.result[0];
      let labels = result.timestamp;
      let data = result.indicators.quote[0].close;

      let charData: ChartLine = {
        labels,
        datasets: [
          {
            label: result.meta.symbol,
            data: data,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",

          },
        ],
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
};
