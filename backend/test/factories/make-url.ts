import { randomUUID } from "node:crypto";

import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Url, UrlProps } from "@/domain/url/enterprise/entities/url";

import { PrismaClient } from "@prisma/client";
import { prisma } from "@/infra/database/prisma";
// import { PrismaUrlMapper } from "@/infra/database/prisma/mappers/prisma-url-mapper";

export function makeUrl(
  override: Partial<UrlProps> = {},
  id?: UniqueEntityID
) {
  const url = Url.create({
    userId: new UniqueEntityID(),
    shortId: randomUUID().substr(2, 5),
    original: faker.internet.url(),

    ...override
  },
    id
  )

  return url
}

// export async function makePrismaUrl(data: Partial<UrlProps> = {}): Promise<Url> {
//   const url = makeUrl(data)

//   await prisma.url.create({
//     data: PrismaUrlMapper.toPrisma(url)
//   })

//   return url
// }

// export class UrlFactory{
//   constructor(
//     prisma: PrismaClient
//   ) {}

//   function makePrismaUrl(data: Partial<UrlProps> = {}): Promise<Url> {
//     const url = makeUrl(data)
  
//     await prisma.url.create({
//       data: PrismaUrlMapper.toPrisma(url)
//     })
  
//     return url
//   }
// }