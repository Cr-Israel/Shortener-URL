import { PrismaClient } from "@prisma/client";

import { Url } from "@/domain/url/enterprise/entities/url";
import { UrlRepository } from "@/domain/url/application/repositories/url-repository";

import { PrismaUrlMapper } from "../mappers/prisma-url-mapper";

export class PrismaUrlRepository implements UrlRepository {
    constructor(
        private prisma: PrismaClient
    ) { }

    async create(url: Url): Promise<void> {
        const data = PrismaUrlMapper.toPrisma(url)
        await this.prisma.url.create({
            data
        })
    }

    async findByOriginal(original: string): Promise<Url | null> {
        const url = await this.prisma.url.findFirst({
            where: {
                original
            }
        })

        if (!url) {
            return null
        }

        return PrismaUrlMapper.toDomain(url)
    }

    async findByShortId(shortId: string): Promise<Url | null> {
        const url = await this.prisma.url.findUnique({
            where: {
                shortId
            }
        })

        if (!url) {
            return null
        }

        return PrismaUrlMapper.toDomain(url)
    }

    async fetchUrlsByUserId(userId: string): Promise<Url[]> {
        const urls = await this.prisma.url.findMany({
            where: {
                userId
            }
        })

        return urls.map(PrismaUrlMapper.toDomain)
    }

    async delete(url: Url): Promise<void> {
        await this.prisma.url.delete({
            where: {
                id: url.id.toString()
            }
        })
    }
}