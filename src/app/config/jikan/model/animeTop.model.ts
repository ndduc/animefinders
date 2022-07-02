export interface AniTop {
    mal_id: number;
    rank: number;
    title: string;
    url: string;
    image_url: string;
    type: string;
    episodes: number;
    start_date: string;
    end_date: string;
    members: number;
    score: number;
}

export interface HentaiTop {
    mal_id: number;
    title: string;
    url: string;
    image_url: string;
    airing: string;
    synopsis: string;
    type: string;
    episodes: number;
    score: number;
    start_date: string;
    end_date:string;
    members: number;
    rated: string;
}