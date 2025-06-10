import { Either, left, right } from "@/core/either"
import { Url } from "../../enterprise/entities/url"

import { UrlRepository } from "../repositories/url-repository"

import { UrlExpiredError } from "./errors/url-expired-error"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

export interface RedirectOriginalUrlUseCaseRequest {
    shortId: string
}

export type RedirectOriginalUrlUseCaseResponse = Either<
    ResourceNotFoundError | UrlExpiredError,
    {
        url: Url
    }
>

export class RedirectOriginalUrlUseCase {
    constructor(
        private urlRepository: UrlRepository
    ) { }

    async execute({
        shortId
    }: RedirectOriginalUrlUseCaseRequest): Promise<RedirectOriginalUrlUseCaseResponse> {
        const url = await this.urlRepository.findByShortId(shortId)

        if (!url) {
            return left(new ResourceNotFoundError())
        }

        const now = new Date()

        if(url.expiresAt && url.expiresAt <= now) {
            return left(new UrlExpiredError())
        }

        return right({
            url
        })
    }
}