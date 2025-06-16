import { Either, left, right } from "@/core/either"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

import { Url } from "../../enterprise/entities/url"
import { UrlRepository } from "../repositories/url-repository"
import { ShortIdGenerator } from "../shortener/short-id-generator"

import { UrlAlreadyShortenerError } from "./errors/url-already-shortener-error"

export interface ShortUrlUseCaseRequest {
    userId: string
    original: string
}

export type ShortUrlUseCaseResponse = Either<
    UrlAlreadyShortenerError,
    {
        url: Url
    }
>

export class ShortUrlUseCase {
    constructor(
        private urlRepository: UrlRepository,
        private shortIdGenerator: ShortIdGenerator
    ) { }

    async execute({
        userId,
        original
    }: ShortUrlUseCaseRequest): Promise<ShortUrlUseCaseResponse> {
        const existing = await this.urlRepository.findByOriginal(original)

        if (existing) {
            const now = new Date()

            if (existing.expiresAt > now) {
                return left(new UrlAlreadyShortenerError(original))
            }

            // Apaga a anterior, já que está expirada
            await this.urlRepository.delete(existing)
        }

        const shortId = this.shortIdGenerator.generate()
        // const shortId = Math.random().toString(36).substr(2, 5)

        const now = new Date()
        const expiresInMs = 1000 * 60 * 60 * 24 // 24 horas

        const url = Url.create({
            userId: new UniqueEntityID(userId),
            shortId: shortId,
            original,
            expiresAt: new Date(now.getTime() + expiresInMs)
        })

        await this.urlRepository.create(url)

        return right({
            url
        })
    }
}