export interface AnimeModel {
	mal_id: number;
	title: string;
	season: string;
	url: string;
	images: AnimeImage;
	episodes: number;
	synopsis: string;
	type: string;
	score: string;
}

export interface AnimeImage {
    jpg: AnimeImageJpg;
}

export interface AnimeImageJpg {
    image_url: string;
    large_image_url: string;
    small_image_url: string;
}