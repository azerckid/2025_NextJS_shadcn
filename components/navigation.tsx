"use client"

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigationItems = [
    {
        label: "Home",
        href: "/",
        items: [
            {
                label: "Home",
                description: "Occident refers to the Western part of the world, especially Europe and the Americas. It’s used in contrast to the Orient, which refers to the Eastern part, like Asia.",
                href: "/",
            },
            {
                label: "another Home",
                description: "Home description another Home",
                href: "/another-home",
            },
            {
                label: "leader board",
                description: "Home description leader board",
                href: "/leader-board",
            },
        ]
    },
    {
        label: "Community",
        href: "/community",
        items: [
            {
                label: "Community",
                description: "Community description",
                href: "/community",
            },
        ]
    },
    {
        label: "Products",
        href: "/products",
        items: [
            {
                label: "Products",
                description: "Products description Occident refers to the Western part of the world, especially Europe and the Americas. It’s used in contrast to the Orient, which refers to the Eastern part, like Asia.",
                href: "/products",
            },
            {
                label: "search",
                description: "Products description search",
                href: "/search",
            },
            {
                label: "product list",
                description: "Products description product list",
                href: "/product-list",
            },
            {
                label: "product detail",
                description: "Products description product detail",
                href: "/product-detail",
            },
            {
                label: "submit product",
                description: "Products description submit product",
                href: "/submit-product",
            },


        ]
    },
    {
        label: "About",
        href: "/about",
        items: [
            {
                label: "About",
                description: "About description Occident refers to the Western part of the world, especially Europe and the Americas. It’s used in contrast to the Orient, which refers to the Eastern part, like Asia.",
                href: "/about",
            },
        ]
    },
    {
        label: "Auth",
        href: "/auth",
        items: [
            {
                label: "Login",
                description: "Login description",
                href: "/login",
            },
            {
                label: "Register",
                description: "Register description",
                href: "/register",
            },
            {
                label: "Logout",
                description: "Logout description",
                href: "/logout",
            },
        ]
    },
    {
        label: "alone",
        href: "/alone",
    },
];

export function Navigation() {
    return (
        <nav className="flex px-20 h-16 items-center justify-between backdrop-blur 
        fixed top-0 left-0 right-0 z-50 bg-background/50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link className="font-bold text-lg tracking-tighter" href="/">NextAuth</Link>
                <Separator orientation="vertical" className="h-6 mx-4" />
                <NavigationMenu>
                    <NavigationMenuList className="flex items-center gap-6">
                        {navigationItems.map((item) => (
                            <NavigationMenuItem key={item.label}>
                                {item.items ?
                                    <>
                                        <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                                        <NavigationMenuContent >
                                            <ul className="grid gap-3 p-6 w-[600px] font-light grid-cols-2">
                                                {item.items.map((subItem) => (
                                                    <NavigationMenuItem
                                                        asChild
                                                        key={subItem.label}
                                                        className={cn(
                                                            "select-none rounded-md transition-colors bg-accent focus:bg-primary/20 hover:bg-primary/20",
                                                            subItem.href === "/submit-product" && "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20"
                                                        )}>
                                                        <NavigationMenuLink
                                                            href={subItem.href}
                                                            className="p-3 space-y-1 block leading-none no-underline outline-none">
                                                            <span className="text-sm font-medium">{subItem.label}</span>
                                                            <p className="text-sm text-muted-foreground font-light ">{subItem.description}</p>
                                                        </NavigationMenuLink>
                                                    </NavigationMenuItem>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </>
                                    : <NavigationMenuLink href={item.href} className="p-3 space-y-1 block leading-none no-underline outline-none">
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </NavigationMenuLink>}
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </nav>
    );
}