import PropTypes from "prop-types";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useRef } from "react";

const customHexagonPlugin = {
  id: "customHexagonPlugin",
  beforeDraw(chart) {
    const {
      ctx,
      scales: { r },
    } = chart;
    ctx.save();

    const hexagonCoordinates = [
      r.getPointPositionForValue(0, 600),
      r.getPointPositionForValue(600, 400),
      r.getPointPositionForValue(200, 800),
      r.getPointPositionForValue(800, 800),
      r.getPointPositionForValue(680, 1000),
    ];

    ctx.beginPath();
    ctx.moveTo(hexagonCoordinates[0].x, hexagonCoordinates[0].y);
    hexagonCoordinates.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();

    ctx.fillStyle = "#10314F66";
    ctx.strokeStyle = "#0072DC";
    ctx.lineWidth = 1;

    ctx.fill();
    ctx.stroke();

    ctx.restore();
  },
};

const customLabelPlugin = {
  id: "customLabelPlugin",
  afterDraw(chart) {
    const ctx = chart.ctx;
    ctx.save();
    const { r } = chart.scales;

    chart.data.labels.forEach((label, index) => {
      const lines = label.split(" ");
      const { x, y } = r.getPointPosition(index, r.drawingArea + 30);

      lines.forEach((line, lineIndex) => {
        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(line, x, y + lineIndex * 12);
      });
    });

    ctx.restore();
  },
};

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  customHexagonPlugin,
  customLabelPlugin
);

const GraphCard = ({ data }) => {
  const chartRef = useRef(null);

  const dataset = data?.datasets[0];

  useEffect(() => {
    return () => {
      ChartJS.getChart("myRadarChart")?.destroy();
    };
  }, [data]);

  return (
    <div
      ref={chartRef}
      className="px-1 text-white rounded-lg flex flex-col overflow-hidden"
    >
      <div className="flex justify-between">
        <p>{dataset?.role}</p>
        <p>Skill Stack Score</p>
      </div>
      <p className="text-3xl flex justify-end font-bold">{dataset?.score}</p>
      <Radar
        id="myRadarChart"
        className="relative"
        style={{ top: "-100px" }}
        data={data}
        options={{
          
          scales: {
            r: {
              beginAtZero: true,
              max: 1000,
              ticks: {
                stepSize: 200,
                color: "white",
                backdropColor: "transparent",
              },
              grid: {
                color: "rgba(255, 255, 255, 0.2)",
              },
              angleLines: {
                color: "rgba(255, 255, 255, 0.2)",
              },
              pointLabels: {
                display: true,
                color: "transparent",
              },
              pointRadius: 0,
            },
          },
          plugins: {
            legend: {
              display: false,
              labels: {
                color: "white",
              },
            },
          },
          elements: {
            line: {
              borderWidth: 1,
              borderColor: (context) => {
                return context.datasetIndex === 0 ? "#8AFF37" : "#0072DC";
              },
              backgroundColor: (context) => {
                return context.datasetIndex === 0 ? "#507A0340" : "#10314F66";
              },
            },
          },
        }}
      />
      <div className="flex justify-end relative" style={{ top: '-170px' }}>
        <p className="text-white cursor-pointer border border-white h-8 p-2 rounded-3xl">
          View more
        </p>
      </div>
    </div>
  );
};

GraphCard.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        role: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.number).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default GraphCard;