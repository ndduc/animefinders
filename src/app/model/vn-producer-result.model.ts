import { VnProducerModel } from "./vn-producer.model";

export interface VnProducerResultModel {
	results: VnProducerModel[];
	count: number;
	IsError: boolean;
	Error: string;
}