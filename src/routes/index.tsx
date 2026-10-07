import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/gym/home-page";
import { getWorkoutVideos } from "@/lib/pexels";

export const Route = createFileRoute("/")({
  loader: () => getWorkoutVideos(),
  component: Home,
});

function Home() {
  const videos = Route.useLoaderData();
  return <HomePage videos={videos} />;
}
