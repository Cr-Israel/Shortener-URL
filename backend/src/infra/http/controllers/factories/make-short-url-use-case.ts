import { prisma } from "@/infra/database/prisma";

import { ShortUrlUseCase } from "@/domain/url/application/use-cases/short-url";

import { PrismaUrlRepository } from "@/infra/database/prisma/repositories/prisma-url-repository";
import { ShortIdGeneratorInfra } from "@/infra/utils/short-id-generator";

export function makeShortUrlUseCase() {
  return new ShortUrlUseCase(new PrismaUrlRepository(prisma), new ShortIdGeneratorInfra())
}