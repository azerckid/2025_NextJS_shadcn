import { z } from "zod";
import { Play } from "lucide-react";

const VideoSchema = z.object({
    id: z.string(),
    key: z.string(),
    name: z.string(),
    type: z.string(),
    site: z.string(),
});

const BASE_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getVideos(id: string) {
    const response = await fetch(`${BASE_URL}/${id}/videos`, { next: { revalidate: 60 } });
    if (!response.ok) return [];
    const data = await response.json();
    const result = z.array(VideoSchema).safeParse(data);
    return result.success ? result.data : [];
}

export async function MovieVideos({ id }: { id: string }) {
    const videos = await getVideos(id);
    const trailer = videos.find((v) => v.type === "Trailer" && v.site === "YouTube") || videos[0];

    if (!trailer) return null;

    return (
        <div className="lg:col-start-5 lg:col-span-8 space-y-6 mt-10 relative z-10">
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
    );
}
