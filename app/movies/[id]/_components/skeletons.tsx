import { Skeleton } from "@/components/ui/skeleton";
import { Play } from "lucide-react";

export function MovieInfoSkeleton() {
    return (
        <>
            <div className="absolute inset-0 w-full h-[80vh] pointer-events-none overflow-hidden">
                <div className="w-full h-full bg-primary/5 blur-[100px]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <Skeleton className="aspect-[2/3] w-full rounded-[2.5rem] shadow-2xl" />
                    <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-24 rounded-3xl" />
                        ))}
                    </div>
                </div>

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
                </div>
            </div>
        </>
    );
}

export function MovieVideosSkeleton() {
    return (
        <div className="lg:col-start-5 lg:col-span-8 space-y-6 mt-10 relative z-10">
            <div className="flex items-center gap-2 opacity-50">
                <Play className="w-5 h-5 text-muted-foreground" />
                <Skeleton className="h-8 w-48 rounded-lg" />
            </div>
            <Skeleton className="aspect-video w-full rounded-[2rem] shadow-2xl" />
        </div>
    );
}
