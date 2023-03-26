import { VnImageModel } from "./vn-image.model";

export interface VnSearchModel {
	id: string;
    title: string;
    alttitle: string;
    rating: string;
    popularity: string;
    released: string;
    languages: string[];
    image: VnImageModel;
}