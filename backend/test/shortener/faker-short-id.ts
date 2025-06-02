import { ShortIdGenerator } from "@/domain/url/application/shortener/short-id-generator";
import { randomUUID } from "node:crypto";

export class FakeShortIdGenerator implements ShortIdGenerator {
  generate() {
    // return Math.random().toString(36).substr(2, 5)
    return randomUUID().substr(2, 5)
  }
}
