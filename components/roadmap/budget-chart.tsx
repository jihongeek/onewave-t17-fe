"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "1월", 인건비: 1400, 인프라: 53, 마케팅: 100, 운영: 230 },
  { month: "2월", 인건비: 1400, 인프라: 53, 마케팅: 100, 운영: 230 },
  { month: "3월", 인건비: 1400, 인프라: 53, 마케팅: 100, 운영: 230 },
  { month: "4월", 인건비: 1200, 인프라: 133, 마케팅: 300, 운영: 230 },
  { month: "5월", 인건비: 1200, 인프라: 133, 마케팅: 300, 운영: 230 },
  { month: "6월", 인건비: 1200, 인프라: 133, 마케팅: 300, 운영: 230 },
  { month: "7월", 인건비: 1200, 인프라: 133, 마케팅: 350, 운영: 230 },
  { month: "8월", 인건비: 1200, 인프라: 133, 마케팅: 350, 운영: 230 },
  { month: "9월", 인건비: 1200, 인프라: 133, 마케팅: 350, 운영: 230 },
  { month: "10월", 인건비: 1200, 인프라: 133, 마케팅: 200, 운영: 230 },
  { month: "11월", 인건비: 1200, 인프라: 133, 마케팅: 200, 운영: 230 },
  { month: "12월", 인건비: 1200, 인프라: 133, 마케팅: 200, 운영: 230 },
];

const COLORS = {
  인건비: "#8ac056",
  인프라: "#3b82f6",
  마케팅: "#f59e0b",
  운영: "#94a3b8",
};

export function BudgetChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-1 text-lg font-semibold text-foreground">
        월별 예상 지출
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        카테고리별 월간 비용 추이 (단위: 만원)
      </p>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 15%, 90%)" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "hsl(210, 10%, 45%)" }}
              axisLine={{ stroke: "hsl(210, 15%, 90%)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "hsl(210, 10%, 45%)" }}
              axisLine={{ stroke: "hsl(210, 15%, 90%)" }}
              tickLine={false}
              width={50}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(210, 15%, 90%)",
                borderRadius: "8px",
                fontSize: 12,
              }}
              formatter={(value: number) => [`${value}만원`]}
            />
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            />
            <Bar
              dataKey="인건비"
              stackId="a"
              fill={COLORS.인건비}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="인프라"
              stackId="a"
              fill={COLORS.인프라}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="마케팅"
              stackId="a"
              fill={COLORS.마케팅}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="운영"
              stackId="a"
              fill={COLORS.운영}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
