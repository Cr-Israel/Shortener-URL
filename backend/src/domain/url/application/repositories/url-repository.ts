import { Url } from "../../enterprise/entities/url";

export interface UrlRepository {
    create(url: Url): Promise<void>

    findByOriginal(original: string): Promise<Url | null>
    findByShortId(shortId: string): Promise<Url | null>

    fetchUrlsByUserId(userId: string): Promise<Url[]>

    delete(url: Url): Promise<void>
}