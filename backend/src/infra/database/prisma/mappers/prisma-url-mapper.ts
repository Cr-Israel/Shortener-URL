import { Url as PrismaUrl, Prisma } from "@prisma/client"

import { Url } from "@/domain/url/enterprise/entities/url";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export class PrismaUrlMapper {
  static toDomain(raw: PrismaUrl): Url {
    return Url.create({
      userId: new UniqueEntityID(raw.userId),
      shortId: raw.shortId,
      original: raw.original,
    //   expiresAt: raw.expiresAt,
      createdAt: raw.createdAt,
    }, new UniqueEntityID(raw.id))
  }

  static toPrisma(url: Url): Prisma.UrlUncheckedCreateInput {
    return {
      id: url.id.toString(),
      userId: url.userId.toString(),
      shortId: url.shortId,
      original: url.original,
      createdAt: url.createdAt
    }
  }
}