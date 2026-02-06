"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const costs = [
  {
    category: "인건비",
    items: [
      { name: "풀타임 개발자 (2명)", monthly: 8000000, quarter: "Q1-Q4" },
      { name: "파트타임 디자이너", monthly: 2000000, quarter: "Q1-Q2" },
      { name: "PM / 기획자", monthly: 4000000, quarter: "Q1-Q4" },
    ],
  },
  {
    category: "인프라",
    items: [
      { name: "클라우드 서버 (AWS)", monthly: 500000, quarter: "Q1-Q4" },
      { name: "도메인 / SSL", monthly: 30000, quarter: "Q1-Q4" },
      { name: "AI API 비용", monthly: 800000, quarter: "Q2-Q4" },
    ],
  },
  {
    category: "마케팅",
    items: [
      { name: "디지털 광고", monthly: 2000000, quarter: "Q2-Q4" },
      { name: "콘텐츠 마케팅", monthly: 1000000, quarter: "Q1-Q4" },
      { name: "PR / 이벤트", monthly: 500000, quarter: "Q3-Q4" },
    ],
  },
  {
    category: "운영",
    items: [
      { name: "법률 / 회계", monthly: 500000, quarter: "Q1-Q4" },
      { name: "사무실 임차", monthly: 1500000, quarter: "Q1-Q4" },
      { name: "기타 운영비", monthly: 300000, quarter: "Q1-Q4" },
    ],
  },
];

function formatWon(value: number) {
  if (value >= 10000) {
    return `${(value / 10000).toLocaleString()}만원`;
  }
  return `${value.toLocaleString()}원`;
}

export function CostTable() {
  const totalMonthly = costs.reduce(
    (sum, cat) => sum + cat.items.reduce((s, item) => s + item.monthly, 0),
    0
  );

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          비용 항목 상세
        </h2>
        <div className="text-sm text-muted-foreground">
          월 합계:{" "}
          <span className="font-semibold text-foreground">
            {formatWon(totalMonthly)}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-32">카테고리</TableHead>
              <TableHead>항목</TableHead>
              <TableHead className="text-right">월 비용</TableHead>
              <TableHead className="text-right">연 비용</TableHead>
              <TableHead className="text-center">기간</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {costs.map((cat) =>
              cat.items.map((item, idx) => (
                <TableRow key={`${cat.category}-${item.name}`}>
                  {idx === 0 && (
                    <TableCell
                      className="font-medium text-foreground"
                      rowSpan={cat.items.length}
                    >
                      <Badge variant="outline" className="text-xs">
                        {cat.category}
                      </Badge>
                    </TableCell>
                  )}
                  <TableCell className="text-sm">{item.name}</TableCell>
                  <TableCell className="text-right text-sm">
                    {formatWon(item.monthly)}
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium">
                    {formatWon(item.monthly * 12)}
                  </TableCell>
                  <TableCell className="text-center text-xs text-muted-foreground">
                    {item.quarter}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
