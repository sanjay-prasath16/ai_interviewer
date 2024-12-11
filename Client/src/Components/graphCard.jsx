import PropTypes from "prop-types";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const GraphCard = ({ data }) => {
  const formattedData = data.labels.map((label, index) => ({
    subject: label,
    blue: data.datasets[0].data[index],
    green: data.datasets[0]?.score || 0,
    fullMark: 1000,
  }));

  const CustomTick = ({ payload, x, y, textAnchor }) => {
    const lines = payload.value.split(" ");
    return (
      <g transform={`translate(${x},${y})`}>
        {lines.map((line, index) => (
          <text
            key={index}
            x={0}
            y={index * 12}
            dy={12}
            textAnchor={textAnchor}
            fill="#fff"
            fontSize={10}
          >
            {line}
          </text>
        ))}
      </g>
    );
  };

  return (
    <div className="p-6 rounded-xl text-white flex flex-col justify-between h-full w-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-medium">{data.datasets[0].role}</h2>
        <div className="text-right">
          <div className="text-sm">Skill Stack Score</div>
          <div className="text-6xl font-semibold">{data.datasets[0].score}</div>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="flex -mt-[10%] h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formattedData}>
            <PolarGrid stroke="#7E7E7E" />
            <PolarAngleAxis dataKey="subject" tick={CustomTick} />
            <PolarRadiusAxis
              angle={70}
              domain={[0, 1000]}
              axisLine={false}
              tick={{ fill: "#fff", fontSize: 10 }}
              tickCount={6}
              tickFormatter={(value) => (value === 0 ? "" : value)}
            />

            {/* Blue Pentagon - Slightly Tilted */}
            <Radar
              name="Blue Skills"
              dataKey="blue"
              stroke="#0072DC"
              fill="#0072DC"
              fillOpacity={0.4}
            />

            {/* Green Pambaram Shape */}
            <Radar
              name="Green Skills"
              dataKey="green"
              stroke="#8AFF37"
              fill="#8AFF37"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* View More Button */}
      <div className="flex justify-end">
        <p className="text-white cursor-pointer border border-white h-8 px-4 py-2 rounded-3xl">
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