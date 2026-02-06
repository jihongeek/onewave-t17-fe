"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FeedFiltersProps {
  sortBy: string;
  onSortChange: (val: string) => void;
  category: string;
  onCategoryChange: (val: string) => void;
}

export function FeedFilters({
  sortBy,
  onSortChange,
  category,
  onCategoryChange,
}: FeedFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 md:max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="아이디어 검색..." className="pl-9" />
      </div>

      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="popular">인기순</SelectItem>
          <SelectItem value="score">AI 점수순</SelectItem>
          <SelectItem value="recent">최신순</SelectItem>
        </SelectContent>
      </Select>

      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[130px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체 카테고리</SelectItem>
          <SelectItem value="healthcare">헬스케어</SelectItem>
          <SelectItem value="fintech">핀테크</SelectItem>
          <SelectItem value="edtech">에듀테크</SelectItem>
          <SelectItem value="ecommerce">이커머스</SelectItem>
          <SelectItem value="saas">SaaS</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
