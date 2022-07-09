import { GogoAnimeVIDCDNModel } from "./gogoanime-vidcdn.mode";

export interface GogoAnimeStreamVIDCDNModel {
    referer: string,
    sources: GogoAnimeVIDCDNModel [],
    sources_bk: GogoAnimeVIDCDNModel[]
}