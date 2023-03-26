import { VnImageModel } from "./vn-image.model";
import { VnScreenshootModel } from "./vn-screenshoot.model";
import { VnTagModel } from "./vn-tag.model";

export interface VnDetailModel {
	id: string;
    title: string;
    alttitle: string;
    rating: string;
    popularity: string;
    released: string;
    languages: string[];
    image: VnImageModel[];
    tags: VnTagModel[];
    screenshoots: VnScreenshootModel[];
}