import { Url } from "@/domain/url/enterprise/entities/url"
import { UrlRepository } from "@/domain/url/application/repositories/url-repository"

export class InMemoryUrlRepository implements UrlRepository {
  public items: Url[] = []

  async create(url: Url): Promise<void> {
    this.items.push(url)
  }
}