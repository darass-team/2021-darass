import { Line } from "react-chartjs-2";
import { PALETTE } from "@/constants/styles/palette";
import { COMMENT_STATISTICS } from "@/types/statistics";
import { Container } from "./styles";

export interface Props {
  data: COMMENT_STATISTICS[];
  isDataLoaded: boolean;
}

const CommentStatisticsChart = ({ data, isDataLoaded }: Props) => {
  const xValue = data.map(_data => _data.date);
  const yValue = data.map(_data => _data.count);

  return (
    <Container isDataLoaded={isDataLoaded}>
      <Line
        type="line"
        data={{
          labels: xValue,
          datasets: [
            {
              data: yValue,
              fill: true,
              borderColor: PALETTE.PRIMARY,
              pointHoverBorderWidth: 10
            }
          ]
        }}
        options={{
          animation: {
            duration: 500,
            easing: "easeOutQuad"
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  stepSize: 100
                }
              }
            ],
            xAxes: [
              {
                offset: true
              }
            ]
          },
          maintainAspectRatio: false,
          legend: { display: false },
          events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
          hover: {
            intersect: false
          }
        }}
      />
    </Container>
  );
};

export default CommentStatisticsChart;
