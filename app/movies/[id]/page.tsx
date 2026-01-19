import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MovieInfo } from "./_components/movie-info";
import { MovieVideos } from "./_components/movie-videos";
import { MovieInfoSkeleton, MovieVideosSkeleton } from "./_components/skeletons";

const BASE_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovie(id: string) {
    const response = await fetch(`${BASE_URL}/${id}`, { next: { revalidate: 60 } });
    if (!response.ok) return null;
    const data = await response.json();
    // 데이터 유무 확인용 간단 스키마 (generateMetadata 등에서 사용)
    return data;
}

// Static Rendering용 파라미터 생성 (사전 렌더링)
export async function generateStaticParams() {
    const response = await fetch(BASE_URL);
    const movies = await response.json();
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

    return (
        <div className="relative min-h-screen bg-background pb-20 overflow-hidden">
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

                {/* 영화 정보 스트리밍: 정보가 로드되는 동안에만 해당 부분 스켈레톤 표시 */}
                <Suspense fallback={<MovieInfoSkeleton />}>
                    <MovieInfo id={id} />
                </Suspense>

                {/* 비디오 스트리밍: 비디오는 정보와 무관하게 준비되는 대로 나타남 */}
                <Suspense fallback={<MovieVideosSkeleton />}>
                    <MovieVideos id={id} />
                </Suspense>
            </div>
        </div>
    );
}