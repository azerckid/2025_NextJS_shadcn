"use client"

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

const navigationItems = [
    {
        label: "Home",
        href: "/",
    },
];

export function Navigation() {
    const { data: session } = useSession();

    return (
        <nav className="flex px-4 md:px-20 h-16 items-center justify-between backdrop-blur 
        fixed top-0 left-0 right-0 z-50 bg-background/50 border-b">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between w-full">
                <div className="flex items-center">
                    <Link className="font-bold text-lg tracking-tighter" href="/">BetterAuth</Link>
                    <Separator orientation="vertical" className="h-6 mx-4" />
                    <NavigationMenu>
                        <NavigationMenuList className="flex items-center gap-6">
                            {navigationItems.map((item) => (
                                <NavigationMenuItem key={item.label}>
                                    <NavigationMenuLink href={item.href} className="p-3 space-y-1 block leading-none no-underline outline-none">
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex items-center gap-4">
                    {session ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium hidden sm:inline-block">{session.user.name}</span>
                            <Button variant="ghost" size="sm" onClick={() => signOut()}>
                                로그아웃
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button asChild variant="ghost" size="sm">
                                <Link href="/login">로그인</Link>
                            </Button>
                            <Button asChild size="sm">
                                <Link href="/register">회원가입</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}