"use client";

import { useEffect, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CostTable } from "@/components/roadmap/cost-table";
import { QuarterlyPlan } from "@/components/roadmap/quarterly-plan";
import { BudgetChart } from "@/components/roadmap/budget-chart";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useAuthModal } from "@/components/auth-modal";

export default function RoadmapPage() {
  const { isLoggedIn, isLoading } = useAuth();
  const { openModal } = useAuthModal();
  const promptedRef = useRef(false);

  useEffect(() => {
    if (promptedRef.current || isLoading) return;
    if (!isLoggedIn) {
      promptedRef.current = true;
      alert("로그인이 필요한 기능입니다");
      openModal();
    }
  }, [isLoggedIn, isLoading, openModal]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-secondary px-4 py-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                초기 자금 로드맵
              </h1>
              <p className="mt-2 text-muted-foreground">
                프로젝트의 초기 비용을 계획하고 월별/분기별 목표를 관리하세요
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="mr-1.5 h-4 w-4" />
                공유
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-1.5 h-4 w-4" />
                내보내기
              </Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <BudgetChart />
            </div>
            <div>
              <QuarterlyPlan />
            </div>
          </div>

          <div className="mt-6">
            <CostTable />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
