import { VnCharacterModel } from "./vn-character.model";

export interface VnCharacterResultModel {
	results: VnCharacterModel[];
	count: number;
	IsError: boolean;
	Error: string;
}