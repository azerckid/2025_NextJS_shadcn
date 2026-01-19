import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 text-center bg-background">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
                <div className="relative mb-10">
                    <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full scale-150 animate-pulse" />
                    <div className="relative bg-card border shadow-2xl rounded-3xl p-8 flex items-center justify-center">
                        <FileQuestion className="w-20 h-20 text-primary" strokeWidth={1.5} />
                        <span className="absolute -top-4 -right-4 bg-primary text-primary-foreground text-4xl font-black px-4 py-2 rounded-2xl shadow-xl transform rotate-12">
                            404
                        </span>
                    </div>
                </div>

                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6 bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent">
                    페이지를 찾을 수 없습니다
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg">
                    죄송합니다. 요청하신 주소는 존재하지 않거나 <br className="hidden sm:inline" />
                    다른 페이지로 이동되었을 수 있습니다.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Button asChild size="lg" className="rounded-2xl px-8 h-12 text-md transition-all hover:scale-105 active:scale-95 group">
                        <Link href="/" className="flex items-center gap-2">
                            <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                            메인 화면으로 이동
                        </Link>
                    </Button>

                    <Button asChild variant="outline" size="lg" className="rounded-2xl px-8 h-12 text-md transition-all hover:bg-accent/50 group">
                        <button
                            onClick={() => typeof window !== 'undefined' && window.history.back()}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            이전 페이지로
                        </button>
                    </Button>
                </div>

                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full text-left">
                    <div className="p-4 rounded-2xl border bg-card/50 backdrop-blur-sm">
                        <h3 className="font-semibold mb-2">무엇을 찾고 계신가요?</h3>
                        <p className="text-sm text-muted-foreground">로그인이나 회원가입이 필요하신가요?</p>
                        <div className="mt-3 flex gap-4">
                            <Link href="/login" className="text-sm font-medium text-primary hover:underline underline-offset-4">로그인</Link>
                            <Link href="/register" className="text-sm font-medium text-primary hover:underline underline-offset-4">회원가입</Link>
                        </div>
                    </div>
                    <div className="p-4 rounded-2xl border bg-card/50 backdrop-blur-sm">
                        <h3 className="font-semibold mb-2">문제가 지속되나요?</h3>
                        <p className="text-sm text-muted-foreground">링크가 작동하지 않는다면 관리자에게 문의해 주세요.</p>
                        <div className="mt-3">
                            <span className="text-sm font-medium text-muted-foreground">help@example.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
