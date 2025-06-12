import { Either, left, right } from "@/core/either"
import { Url } from "../../enterprise/entities/url"

import { UrlRepository } from "../repositories/url-repository"

export interface FetchUserUrlsUseCaseRequest {
    userId: string
}

export type FetchUserUrlsUseCaseResponse = Either<
    null,
    {
        urls: Url[]
    }
>

export class FetchUserUrlsUseCase {
    constructor(
        private urlRepository: UrlRepository
    ) { }

    async execute({
        userId
    }: FetchUserUrlsUseCaseRequest): Promise<FetchUserUrlsUseCaseResponse> {
        const urls = await this.urlRepository.fetchUrlsByUserId(userId)

        return right({
            urls
        })
    }
}