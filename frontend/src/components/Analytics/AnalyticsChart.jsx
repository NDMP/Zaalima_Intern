import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { Box } from "@mui/material";

const COLORS = ["#F59E0B", "#10B981", "#EF4444"];

export default function AnalyticsChart({ stats }) {
  const data = [
    { name: "Pending", value: stats.pending },
    { name: "Accepted", value: stats.accepted },
    { name: "Rejected", value: stats.rejected },
  ].filter((item) => item.value > 0);

  return (
    <>
      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <Box sx={{ mt: 6 }} />

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar
            dataKey="value"
            fill="#2563EB"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}