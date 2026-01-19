import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export default function Loading() {
    return (
        <div className="relative min-h-screen bg-background pb-20 overflow-hidden">
            {/* Background Glow Placeholder */}
            <div className="absolute inset-0 w-full h-[80vh] pointer-events-none overflow-hidden">
                <div className="w-full h-full bg-primary/5 blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 pt-12 relative z-10">
                {/* Back Button Skeleton */}
                <div className="inline-flex items-center gap-2 mb-10 opacity-50">
                    <div className="p-2 rounded-full border bg-background/50">
                        <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <Skeleton className="h-5 w-16 rounded-lg" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left: Poster Skeleton */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <Skeleton className="aspect-[2/3] w-full rounded-[2.5rem] shadow-2xl" />

                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-24 rounded-3xl" />
                            ))}
                        </div>
                    </div>

                    {/* Right: Info Skeleton */}
                    <div className="lg:col-span-8 flex flex-col gap-10">
                        <div className="space-y-6">
                            <Skeleton className="h-8 w-32 rounded-full" />
                            <div className="space-y-4">
                                <Skeleton className="h-16 w-3/4 rounded-2xl" />
                                <Skeleton className="h-16 w-1/2 rounded-2xl" />
                            </div>

                            <div className="flex gap-2">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-10 w-24 rounded-2xl" />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Skeleton className="h-8 w-40 rounded-lg" />
                            <div className="space-y-3">
                                <Skeleton className="h-5 w-full rounded-lg" />
                                <Skeleton className="h-5 w-full rounded-lg" />
                                <Skeleton className="h-5 w-[90%] rounded-lg" />
                                <Skeleton className="h-5 w-[80%] rounded-lg" />
                            </div>
                        </div>

                        {/* Trailer Skeleton */}
                        <div className="space-y-6">
                            <Skeleton className="h-8 w-48 rounded-lg" />
                            <Skeleton className="aspect-video w-full rounded-[2rem] shadow-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
