"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, RefreshCcw, AlertTriangle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // 에러를 로깅하거나 분석 서비스에 전송할 수 있습니다.
        console.error("Movie Detail Error:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] px-4 text-center bg-background">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-destructive/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
                <div className="relative mb-10">
                    <div className="absolute inset-0 blur-3xl bg-destructive/20 rounded-full scale-150 animate-pulse" />
                    <div className="relative bg-card border shadow-2xl rounded-3xl p-8 flex items-center justify-center">
                        <AlertTriangle className="w-20 h-20 text-destructive" strokeWidth={1.5} />
                    </div>
                </div>

                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6 bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent">
                    정보를 불러오지 못했습니다
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg">
                    서버 응답이 늦어지거나 일시적인 네트워크 문제가 발생했을 수 있습니다. <br className="hidden sm:inline" />
                    잠시 후 다시 시도해 주세요.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Button
                        size="lg"
                        className="rounded-2xl px-8 h-12 text-md transition-all hover:scale-105 active:scale-95 group"
                        onClick={() => reset()}
                    >
                        <RefreshCcw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                        다시 시도하기
                    </Button>

                    <Button
                        variant="ghost"
                        size="lg"
                        asChild
                        className="rounded-2xl px-8 h-12 text-md transition-all hover:bg-accent/50"
                    >
                        <Link href="/" className="flex items-center gap-2">
                            <Home className="w-5 h-5" />
                            홈으로 가기
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
