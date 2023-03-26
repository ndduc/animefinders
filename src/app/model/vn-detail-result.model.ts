import { VnDetailModel } from "./vn-detail.model";

export interface VnDetailResultModel {
	results: VnDetailModel[];
	IsError: boolean;
	Error: string;
}