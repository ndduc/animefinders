import { VnExtLinkSubModel } from "./vn-sub-extlink.model";
import { VnLanguageSubModel } from "./vn-sub-language.model";
import { VnVnsSubModel } from "./vn-sub-vns.model";

export interface VnReleaseModel {
	id: string;
    title: string;
    alttitle: string;
    platforms: string [];
    languages: VnLanguageSubModel [];
    extlinks: VnExtLinkSubModel[];
    vns: VnVnsSubModel[]
}