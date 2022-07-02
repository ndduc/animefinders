import { Observable } from "rxjs";

export interface CacheModel {
    url: string,
    data: Observable<any>
}