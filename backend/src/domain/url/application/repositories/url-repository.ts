import { Url } from "../../enterprise/entities/url";

export interface UrlRepository {
    create(url: Url): Promise<void>
    findByOriginal(original: string): Promise<Url | null>
    delete(url: Url): Promise<void>
}