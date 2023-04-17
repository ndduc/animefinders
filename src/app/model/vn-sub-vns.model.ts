import { VnImageModel } from "./vn-image.model";

export interface VnVnsSubModel {
    image: VnImageModel;
    id: string;
    title: string;
    alttitle: string;
    role: string;
}