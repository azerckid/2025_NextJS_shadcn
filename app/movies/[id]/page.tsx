import { z } from "zod";
import { Star, Clock, Calendar, ArrowLeft, Play, Info } from "lucide-react";
import Link from "next/link";

// 영화 상세 데이터 스키마
const MovieDetailSchema = z.object({
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

// 비디오 데이터 스키마
const VideoSchema = z.object({
    id: z.string(),
    key: z.string(),
    name: z.string(),
    type: z.string(),
    site: z.string(),
});

const BASE_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovie(id: string) {
    const response = await fetch(`${BASE_URL}/${id}`, { next: { revalidate: 60 } });
    if (!response.ok) return null;
    const data = await response.json();
    const result = MovieDetailSchema.safeParse(data);
    return result.success ? result.data : null;
}

async function getVideos(id: string) {
    const response = await fetch(`${BASE_URL}/${id}/videos`, { next: { revalidate: 60 } });
    if (!response.ok) return [];
    const data = await response.json();
    const result = z.array(VideoSchema).safeParse(data);
    return result.success ? result.data : [];
}

// Static Rendering용 파라미터 생성 (사전 렌더링)
export async function generateStaticParams() {
    const response = await fetch(BASE_URL);
    const movies = await response.json();
    // 상위 20개 영화만 미리 정적 생성하여 빌드 속도와 런타임 성능 균형을 맞춤
    return movies.slice(0, 20).map((movie: { id: number }) => ({
        id: movie.id.toString(),
    }));
}

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { id } = await params;
    const movie = await getMovie(id);
    return {
        title: movie ? `${movie.title} | Movies` : "Movie Detail",
        description: movie?.overview || "Movie detail page",
    };
}

export default async function MovieDetail({ params }: Props) {
    const { id } = await params;
    const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);

    if (!movie) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh]">
                <h2 className="text-2xl font-bold">영화를 찾을 수 없습니다.</h2>
                <Link href="/" className="mt-4 text-primary hover:underline">홈으로 돌아가기</Link>
            </div>
        );
    }

    const trailer = videos.find((v) => v.type === "Trailer" && v.site === "YouTube") || videos[0];

    return (
        <div className="relative min-h-screen bg-background pb-20 overflow-hidden">
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

            {/* Main Content Area */}
            <div className="container mx-auto px-4 pt-12 relative z-10">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 mb-10 text-muted-foreground hover:text-foreground transition-colors group"
                >
                    <div className="p-2 rounded-full border bg-background/50 backdrop-blur group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">돌아가기</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
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
                                <span className="text-lg font-black">{movie.release_date.split('-')[0]}</span>
                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Year</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Info & Trailer */}
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

                        {/* Trailer Section */}
                        {trailer && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <Play className="w-5 h-5 text-primary" />
                                    <h3 className="text-xl font-bold">Official Trailer</h3>
                                </div>
                                <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/10">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${trailer.key}?controls=1&showinfo=0&modestbranding=1`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full"
                                        title={trailer.name}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}