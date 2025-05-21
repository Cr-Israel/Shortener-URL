import { Url } from "../../enterprise/entities/url";

export interface UrlRepository {
    create(url: Url): Promise<void>
}