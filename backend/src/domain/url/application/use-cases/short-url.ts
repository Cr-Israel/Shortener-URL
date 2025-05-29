import { Either, left, right } from "@/core/either"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

import { Url } from "../../enterprise/entities/url"
import { UrlRepository } from "../repositories/url-repository"

export interface RegisterUrlUseCaseRequest {
    userId: string
    original: string
}

export type RegisterUrlUseCaseResponse = Either<
    null,
    {
        url: Url
    }
>

export class RegisterUrlUseCase {
    constructor(
        private urlRepository: UrlRepository,
    ) { }

    async execute({
        userId,
        original
    }: RegisterUrlUseCaseRequest): Promise<RegisterUrlUseCaseResponse> {
        const shortId = Math.random().toString(36).substr(2, 5)

        const url = Url.create({
            userId: new UniqueEntityID(userId),
            shortId: shortId,
            original
        })

        console.log(url)
        console.log(url.userId)
        console.log(url.shortId)
        console.log(url.original)

        await this.urlRepository.create(url)

        return right({
            url
        })
    }
}