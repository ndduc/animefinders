export interface ProjectModel {
    id: number;
    description: string;
    long_description: string;
    image_url: string;
    image_urls: string[]; // array of image url for slice show
    stacks: string[];   // general stack
    techs: string[];    // general tech sucj as framework, cloud serv.
    developments: string[]; // general development stuff like api, front end, mobile,etc ...
    source_code_url: string;
    document_url: string;
    reference_url: string;
    imageObject: Array<object>; // this object will be used for slider and it to be created on int
}