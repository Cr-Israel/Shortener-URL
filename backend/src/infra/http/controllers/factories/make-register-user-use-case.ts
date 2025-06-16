import { prisma } from "@/infra/database/prisma";

import { RegisterUserUseCase } from "@/domain/url/application/use-cases/register-user";

import { BcryptHasher } from "@/infra/cryptography/bcrypt-hasher";
import { PrismaUserRepository } from "@/infra/database/prisma/repositories/prisma-user-repository";

export function makeRegisterUserUseCase() {
  return new RegisterUserUseCase(new PrismaUserRepository(prisma), new BcryptHasher())
}