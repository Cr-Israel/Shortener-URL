import { UniqueEntityID } from "@/core/entities/unique-entity-id"

import { Url } from "@/domain/url/enterprise/entities/url"
import { UrlRepository } from "@/domain/url/application/repositories/url-repository"

export class InMemoryUrlRepository implements UrlRepository {
  public items: Url[] = []

  async create(url: Url): Promise<void> {
    this.items.push(url)
  }
  
  async findByOriginal(original: string): Promise<Url | null> {
    return this.items.find(url => url.original === original) ?? null
  }

  async findByShortId(shortId: string): Promise<Url | null> {
    return this.items.find(url => url.shortId === shortId) ?? null
  }

  async fetchUrlsByUserId(userId: string): Promise<Url[]> {
    const urls = this.items.filter(item => item.userId.equals(new UniqueEntityID(userId)))

    return urls
  }

  async delete(url: Url): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === url.id)

    this.items.splice(itemIndex, 1)
  }
}