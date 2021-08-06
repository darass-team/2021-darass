import { Container } from "./styles";
import { Line } from "react-chartjs-2";
import { PALETTE } from "../../../styles/palette";

type ViewType = "Time" | "Day" | "Month";

interface Data {
  time: string;
  count: number;
}

export interface Props {
  data: Data[];
}

const CommentStatistics = ({ data }: Props) => {
  const xValue = data.map(_data => _data.time);
  const yValue = data.map(_data => _data.count);

  return (
    <Container style={{ width: "100%", height: "50vh" }}>
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
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  stepSize: 100
                }
              }
            ]
          },
          maintainAspectRatio: false,
          legend: { display: false }
        }}
      />
    </Container>
  );
};

export default CommentStatistics;
