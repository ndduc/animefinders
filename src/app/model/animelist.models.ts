import { AnimeGenre } from "./anime-genre.model";
import { AnimePaginationModel } from "./anime-pagination.model";
import { AnimeModel } from "./anime.model";

// export interface AniList {
// 	mal_id: number;
// 	title: string;
// 	season_name: string;
// 	season_year: string;
// 	url: string;
// 	image_url: string;
// 	airing_start: string;
// 	episodes: number;
// 	synopsis: string;
// 	type: string;
// 	score: string;
// 	rated: string;
// 	genres: AnimeGenre[];

// }

export interface AnimeListWithPagination {
	pagination: AnimePaginationModel,
	data: AnimeModel[]
}