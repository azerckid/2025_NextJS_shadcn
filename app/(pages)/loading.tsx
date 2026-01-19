import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-20 bg-background">
            {/* Hero Section Skeleton */}
            <div className="flex flex-col items-center mb-20 text-center relative">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
                <Skeleton className="h-16 w-3/4 sm:w-1/2 rounded-2xl mb-6" />
                <Skeleton className="h-6 w-full max-w-2xl rounded-lg mb-2" />
                <Skeleton className="h-6 w-2/3 max-w-xl rounded-lg" />
            </div>

            {/* Movie Grid Skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex flex-col space-y-4">
                        {/* Poster Skeleton */}
                        <Skeleton className="aspect-[2/3] w-full rounded-[2rem] shadow-lg border border-border/10" />

                        {/* Movie Info Skeleton */}
                        <div className="px-2 space-y-2">
                            <Skeleton className="h-6 w-3/4 rounded-lg" />
                            <Skeleton className="h-4 w-1/2 rounded-md" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Skeleton */}
            <div className="mt-32 pt-10 border-t border-border/40 flex justify-center">
                <Skeleton className="h-4 w-64 rounded-md" />
            </div>
        </div>
    );
}
