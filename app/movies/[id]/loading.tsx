import { ArrowLeft } from "lucide-react";
import { MovieInfoSkeleton, MovieVideosSkeleton } from "./_components/skeletons";

export default function Loading() {
    return (
        <div className="relative min-h-screen bg-background pb-20 overflow-hidden">
            <div className="container mx-auto px-4 pt-12 relative z-10">
                {/* Back Button Skeleton Container */}
                <div className="inline-flex items-center gap-2 mb-10 opacity-50">
                    <div className="p-2 rounded-full border bg-background/50">
                        <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="h-5 w-16 bg-primary/10 animate-pulse rounded-lg" />
                </div>

                {/* Reusing Modular Skeletons */}
                <MovieInfoSkeleton />
                <MovieVideosSkeleton />
            </div>
        </div>
    );
}
