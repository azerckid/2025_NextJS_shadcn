"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const { data: session, isPending } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-8">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight text-primary">
          Better Auth <span className="text-foreground">Demo</span>
        </h1>

        <p className="text-muted-foreground text-lg">
          Next.js 16, React 19, 그리고 Better Auth가 조화롭게 설정된 템플릿입니다.
        </p>

        <div className="p-8 border rounded-2xl bg-card shadow-sm space-y-4">
          {isPending ? (
            <div className="h-20 flex items-center justify-center font-medium">로딩 중...</div>
          ) : session ? (
            <>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">로그인됨</p>
                <h2 className="text-2xl font-bold">{session.user.name} 님</h2>
                <p className="text-sm text-muted-foreground">{session.user.email}</p>
              </div>
              <Button
                variant="destructive"
                onClick={async () => {
                  await signOut();
                  window.location.reload();
                }}
                className="w-full"
              >
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">세션 없음</p>
                <h2 className="text-2xl font-bold">로그인이 필요합니다</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button asChild className="w-full shadow-lg">
                  <Link href="/login">로그인</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/register">회원가입</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}