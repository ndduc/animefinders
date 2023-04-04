import { VnDetailModel } from "./vn-detail.model";
import { VnReleaseModel } from "./vn-release.model";
import { VnSearchModel } from "./vn-search.model";

export interface VnReleaseResultModel {
	results: VnReleaseModel[];
	count: number;
	IsError: boolean;
	Error: string;
}