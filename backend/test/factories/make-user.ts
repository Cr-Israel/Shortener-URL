import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { User, UserProps } from "@/domain/url/enterprise/entities/user";

import { PrismaClient } from "@prisma/client";
import { prisma } from "@/infra/database/prisma";
// import { PrismaUserMapper } from "@/infra/database/prisma/mappers/prisma-user-mapper";

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID
) {
  const user = User.create({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),

    ...override
  },
    id
  )

  return user
}

// export async function makePrismaUser(data: Partial<UserProps> = {}): Promise<User> {
//   const user = makeUser(data)

//   await prisma.user.create({
//     data: PrismaUserMapper.toPrisma(user)
//   })

//   return user
// }

// export class UserFactory{
//   constructor(
//     prisma: PrismaClient
//   ) {}

//   function makePrismaUser(data: Partial<UserProps> = {}): Promise<User> {
//     const user = makeUser(data)
  
//     await prisma.user.create({
//       data: PrismaUserMapper.toPrisma(user)
//     })
  
//     return user
//   }
// }