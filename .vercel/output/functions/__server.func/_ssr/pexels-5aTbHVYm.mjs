import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pexels-5aTbHVYm.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var PEXELS_KEY = "wNw2FWSSVyJMjjzuV2s9BRkqdyKJBaK7JycHOUUuNyA78Ksftx06FVzt";
var FALLBACK_VIDEOS = [
	"https://videos.pexels.com/video-files/4745812/4745812-hd_1280_720_25fps.mp4",
	"https://videos.pexels.com/video-files/3196428/3196428-hd_1280_720_25fps.mp4",
	"https://videos.pexels.com/video-files/6053511/6053511-hd_1280_720_25fps.mp4",
	"https://videos.pexels.com/video-files/7674502/7674502-hd_1366_720_25fps.mp4"
];
function pickLandscapeMp4(files) {
	const mp4s = files.filter((f) => f.file_type === "video/mp4" && f.link && (f.width ?? 0) >= (f.height ?? 0) && (f.width ?? 0) >= 640);
	mp4s.sort((a, b) => Math.abs((a.width ?? 0) - 1280) - Math.abs((b.width ?? 0) - 1280));
	return (mp4s.find((f) => (f.width ?? 0) <= 1920) ?? mp4s[0])?.link ?? null;
}
async function searchPexels(query) {
	const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=6`;
	const res = await fetch(url, {
		headers: { Authorization: PEXELS_KEY },
		signal: AbortSignal.timeout(4e3)
	});
	if (!res.ok) return [];
	const data = await res.json();
	const urls = [];
	for (const video of data.videos ?? []) {
		const link = pickLandscapeMp4(video.video_files ?? []);
		if (link) urls.push(link);
	}
	return urls;
}
var getWorkoutVideos_createServerFn_handler = createServerRpc({
	id: "fc2c32daff3cb0259e4f65dbd49e151f23fc94682a36fe45b44f04fc355956ea",
	name: "getWorkoutVideos",
	filename: "src/lib/pexels.ts"
}, (opts) => getWorkoutVideos.__executeServer(opts));
var getWorkoutVideos = createServerFn({ method: "GET" }).handler(getWorkoutVideos_createServerFn_handler, async () => {
	try {
		const batches = await Promise.all([
			searchPexels("gym workout"),
			searchPexels("deadlift"),
			searchPexels("crossfit")
		]);
		const seen = /* @__PURE__ */ new Set();
		const urls = [];
		for (const batch of batches) for (const link of batch) {
			if (seen.has(link)) continue;
			seen.add(link);
			urls.push(link);
			if (urls.length >= 4) return urls;
		}
		for (const fallback of FALLBACK_VIDEOS) {
			if (urls.length >= 4) break;
			if (!seen.has(fallback)) urls.push(fallback);
		}
		return urls.length ? urls : FALLBACK_VIDEOS;
	} catch {
		return FALLBACK_VIDEOS;
	}
});
//#endregion
export { getWorkoutVideos_createServerFn_handler };
