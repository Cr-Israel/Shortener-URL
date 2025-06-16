import { ShortIdGenerator } from "@/domain/url/application/shortener/short-id-generator";

export class ShortIdGeneratorInfra implements ShortIdGenerator {
  async generate(): Promise<string> {
    const shortId = Math.random().toString(36).substr(2, 5)
    return shortId
  }
}