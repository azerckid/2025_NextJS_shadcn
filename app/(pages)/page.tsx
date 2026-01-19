import Link from "next/link";
import { z } from "zod";
import { Star } from "lucide-react";

// 영화 데이터 스키마 정의
const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string(),
  vote_average: z.number(),
  release_date: z.string(),
});

type Movie = z.infer<typeof MovieSchema>;

const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

// 서버 사이드 데이터 패칭 (ISR 60초 적용)
async function getMovies(): Promise<Movie[]> {
  const response = await fetch(API_URL, { next: { revalidate: 60 } });
  if (!response.ok) {
    throw new Error("영화를 불러오는데 실패했습니다.");
  }
  const data = await response.json();
  const result = z.array(MovieSchema).safeParse(data);

  if (!result.success) {
    console.error("데이터 파싱 에러:", result.error);
    return [];
  }

  return result.data;
}

export const metadata = {
  title: "Home",
  description: "Browse the latest popular movies",
};

export default async function Home() {
  const movies = await getMovies();

  return (
    <div className="container mx-auto px-4 py-20 bg-background">
      {/* Hero Section */}
      <div className="flex flex-col items-center mb-20 text-center relative">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <h1 className="text-5xl font-black tracking-tighter sm:text-7xl mb-6 bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
          최신 인기 영화
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          전 세계가 주목하는 최신 인기 영화들을 실시간 평점과 함께 만나보세요. <br className="hidden sm:inline" />
          당신을 위한 단 하나의 명작을 찾아드립니다.
        </p>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movies/${movie.id}`}
            className="group flex flex-col space-y-4 focus:outline-none"
          >
            {/* Poster Container */}
            <div className="relative aspect-[2/3] overflow-hidden rounded-[2rem] shadow-xl border border-border/50 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:-translate-y-2">
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay with Info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 text-yellow-400 mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-lg font-black text-white">{movie.vote_average.toFixed(1)}</span>
                </div>
                <p className="text-sm font-medium text-gray-300 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 opacity-0 group-hover:opacity-100">
                  {movie.release_date.split('-')[0]} • Release
                </p>
              </div>

              {/* Badges */}
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-full px-3 py-1 border border-white/10 opacity-100 transition-opacity">
                <span className="text-[10px] font-bold text-white tracking-widest uppercase">HD 4K</span>
              </div>
            </div>

            {/* Movie Info */}
            <div className="px-2">
              <h3 className="text-xl font-bold leading-tight line-clamp-1 group-hover:text-primary transition-colors duration-300">
                {movie.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 font-medium italic">
                {movie.release_date}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-32 pt-10 border-t border-border/40 text-center">
        <p className="text-muted-foreground text-sm font-medium">
          Data provided by Nomad Movies API • Updated Daily
        </p>
      </div>
    </div>
  );
}