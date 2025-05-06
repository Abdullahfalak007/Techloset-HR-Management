import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

type ChartItem = {
  dayName: string;
  ON_TIME: number;
  LATE: number;
  ABSENT: number;
};

export default function AttendanceChart({ data }: { data: ChartItem[] }) {
  return (
    <div className="w-full h-64 bg-[#1A1A1A] p-4 rounded-lg">
      <ResponsiveContainer>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 0, left: 0 }}
        >
          <XAxis dataKey="dayName" stroke="#666" />
          <YAxis stroke="#666" allowDecimals={false} />
          <Tooltip />
          {/* stacked bars with rounded tops */}
          <Bar
            dataKey="ON_TIME"
            stackId="a"
            fill="#10b981"
            barSize={12}
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="LATE"
            stackId="a"
            fill="#f43f5e"
            barSize={12}
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="ABSENT"
            stackId="a"
            fill="#fbbf24"
            barSize={12}
            radius={[6, 6, 0, 0]}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
