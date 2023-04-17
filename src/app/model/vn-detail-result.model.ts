import { VnDetailModel } from "./vn-detail.model";

export interface VnDetailResultModel {
	results: VnDetailModel[];
	count: number;
	IsError: boolean;
	Error: string;
}