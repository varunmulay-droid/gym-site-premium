import { createServerFn } from "@tanstack/react-start";

const PEXELS_KEY = "wNw2FWSSVyJMjjzuV2s9BRkqdyKJBaK7JycHOUUuNyA78Ksftx06FVzt";

const FALLBACK_VIDEOS = [
  "https://videos.pexels.com/video-files/4745812/4745812-hd_1280_720_25fps.mp4",
  "https://videos.pexels.com/video-files/3196428/3196428-hd_1280_720_25fps.mp4",
  "https://videos.pexels.com/video-files/6053511/6053511-hd_1280_720_25fps.mp4",
  "https://videos.pexels.com/video-files/7674502/7674502-hd_1366_720_25fps.mp4",
];

function pickLandscapeMp4(files: Array<{
  file_type?: string;
  width?: number;
  height?: number;
  link?: string;
}>): string | null {
  const mp4s = files.filter(
    (f) =>
      f.file_type === "video/mp4" &&
      f.link &&
      (f.width ?? 0) >= (f.height ?? 0) &&
      (f.width ?? 0) >= 640,
  );
  mp4s.sort(
    (a, b) => Math.abs((a.width ?? 0) - 1280) - Math.abs((b.width ?? 0) - 1280),
  );
  const fit = mp4s.find((f) => (f.width ?? 0) <= 1920) ?? mp4s[0];
  return fit?.link ?? null;
}

async function searchPexels(query: string): Promise<string[]> {
  const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=6`;
  const res = await fetch(url, {
    headers: { Authorization: PEXELS_KEY },
    signal: AbortSignal.timeout(4000),
  });
  if (!res.ok) return [];
  const data = (await res.json()) as {
    videos?: Array<{ video_files?: Array<{
      file_type?: string;
      width?: number;
      height?: number;
      link?: string;
    }> }>;
  };
  const urls: string[] = [];
  for (const video of data.videos ?? []) {
    const link = pickLandscapeMp4(video.video_files ?? []);
    if (link) urls.push(link);
  }
  return urls;
}

export const getWorkoutVideos = createServerFn({ method: "GET" }).handler(
  async (): Promise<string[]> => {
    try {
      const batches = await Promise.all([
        searchPexels("gym workout"),
        searchPexels("deadlift"),
        searchPexels("crossfit"),
      ]);
      const seen = new Set<string>();
      const urls: string[] = [];
      for (const batch of batches) {
        for (const link of batch) {
          if (seen.has(link)) continue;
          seen.add(link);
          urls.push(link);
          if (urls.length >= 4) return urls;
        }
      }
      for (const fallback of FALLBACK_VIDEOS) {
        if (urls.length >= 4) break;
        if (!seen.has(fallback)) urls.push(fallback);
      }
      return urls.length ? urls : FALLBACK_VIDEOS;
    } catch {
      return FALLBACK_VIDEOS;
    }
  },
);
