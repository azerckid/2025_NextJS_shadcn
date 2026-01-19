import { z } from "zod";
import { Star, Clock, Calendar, Info, Play } from "lucide-react";

import { notFound } from "next/navigation";

// 영화 상세 데이터 스키마
export const MovieDetailSchema = z.object({
    id: z.number(),
    title: z.string(),
    poster_path: z.string(),
    backdrop_path: z.string().nullable(),
    vote_average: z.number(),
    overview: z.string(),
    release_date: z.string(),
    runtime: z.number(),
    genres: z.array(z.object({ name: z.string() })),
    tagline: z.string().optional(),
});

const BASE_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovie(id: string) {
    const response = await fetch(`${BASE_URL}/${id}`, { next: { revalidate: 60 } });
    if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error("영화를 불러오는 중 서버 에러가 발생했습니다.");
    }
    const data = await response.json();
    const result = MovieDetailSchema.safeParse(data);
    return result.success ? result.data : null;
}

export async function MovieInfo({ id }: { id: string }) {
    // throw new Error("테스트를 위한 의도적인 에러 발생!");
    const movie = await getMovie(id);

    if (!movie) {
        notFound();
    }

    return (
        <>
            {/* Dynamic Background Backdrop */}
            {movie.backdrop_path && (
                <div className="absolute inset-0 w-full h-[80vh] pointer-events-none overflow-hidden">
                    <img
                        src={movie.backdrop_path}
                        alt="backdrop"
                        className="w-full h-full object-cover scale-110 blur-[80px] opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
                {/* Left: Poster Image */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="relative aspect-[2/3] w-full rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/10 group">
                        <img
                            src={movie.poster_path}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-3xl p-4 flex flex-col items-center justify-center text-center">
                            <Star className="w-6 h-6 text-yellow-400 mb-2 fill-current" />
                            <span className="text-lg font-black">{movie.vote_average.toFixed(1)}</span>
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Rating</span>
                        </div>
                        <div className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-3xl p-4 flex flex-col items-center justify-center text-center">
                            <Clock className="w-6 h-6 text-blue-400 mb-2" />
                            <span className="text-lg font-black">{movie.runtime}m</span>
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Runtime</span>
                        </div>
                        <div className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-3xl p-4 flex flex-col items-center justify-center text-center">
                            <Calendar className="w-6 h-6 text-emerald-400 mb-2" />
                            <span className="text-lg font-black">{movie.release_date.split("-")[0]}</span>
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Year</span>
                        </div>
                    </div>
                </div>

                {/* Right: Info Area */}
                <div className="lg:col-span-8 flex flex-col gap-10">
                    <div className="space-y-6">
                        {movie.tagline && (
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-black uppercase tracking-widest letter border border-primary/20">
                                {movie.tagline}
                            </span>
                        )}
                        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-none">
                            {movie.title}
                        </h1>

                        <div className="flex flex-wrap gap-2">
                            {movie.genres.map((genre) => (
                                <span key={genre.name} className="px-5 py-2 rounded-2xl bg-muted/50 font-bold text-sm border border-border/50">
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Info className="w-5 h-5" />
                            <h3 className="text-xl font-bold text-foreground">Overview</h3>
                        </div>
                        <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                            {movie.overview}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
