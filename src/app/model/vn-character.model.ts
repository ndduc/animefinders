import { VnCharacterTraitModel } from "./vn-character-trait.model";
import { VnImageModel } from "./vn-image.model";
import { VnVnsSubModel } from "./vn-sub-vns.model";

export interface VnCharacterModel {
    id: string;
    name: string;
    aliases: string[];
    description: string;
    sex: string[];
    blood_type: string;
    height: string;
    weight: string;
    bust: string;
    waist: string;
    hips: string;
    cup: string;
    age: string;
    // birthday: string;
    image: VnImageModel;
    vns: VnVnsSubModel[];
    traits: VnCharacterTraitModel[];
}