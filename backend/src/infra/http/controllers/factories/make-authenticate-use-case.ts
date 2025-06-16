import { AuthenticateUserUseCase } from "@/domain/url/application/use-cases/authenticate";

import { prisma } from "@/infra/database/prisma";
import { PrismaUserRepository } from "@/infra/database/prisma/repositories/prisma-user-repository";

import { BcryptHasher } from "@/infra/cryptography/bcrypt-hasher";
import { getJwtEncrypter } from "@/infra/utils/singleton-jwt-encrypt";

export function makeAuthenticateUserUseCase() {
  return new AuthenticateUserUseCase(
    new PrismaUserRepository(prisma), new BcryptHasher(), getJwtEncrypter()
  )
}