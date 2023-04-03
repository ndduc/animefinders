import { VnProducerModel } from "./vn-producer.model";

export interface VnProducerResultModel {
	results: VnProducerModel[];
	IsError: boolean;
	Error: string;
}