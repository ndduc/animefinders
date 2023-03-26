import { VnDetailModel } from "./vn-detail.model";
import { VnSearchModel } from "./vn-search.model";

export interface VnSearchResultModel {
	results: VnSearchModel[];
	IsError: boolean;
	Error: string;
}