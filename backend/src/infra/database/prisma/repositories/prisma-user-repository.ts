import { UserRepository } from "@/domain/url/application/repositories/user-repository";

import { PrismaClient } from "@prisma/client";
import { User } from "@/domain/url/enterprise/entities/user";

import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

export class PrismaUserRepository implements UserRepository{
  constructor(
    private prisma: PrismaClient
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    console.log(user)

    if(!user) {
      return null
    }
    
    return PrismaUserMapper.toDomain(user)
  }

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);
    await this.prisma.user.create({
      data
    })
  }
}