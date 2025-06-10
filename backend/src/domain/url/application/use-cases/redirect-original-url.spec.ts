import { RedirectOriginalUrlUseCase } from "./redirect-orignal-url"
import { InMemoryUrlRepository } from "test/repositories/in-memory-url-repository"

import { makeUrl } from "test/factories/make-url"

import { UrlExpiredError } from "./errors/url-expired-error"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

let inMemoryUrlRepository: InMemoryUrlRepository
let sut: RedirectOriginalUrlUseCase

describe('Redirect Orignal Url Use Case', () => {
    beforeEach(() => {
        inMemoryUrlRepository = new InMemoryUrlRepository()
        sut = new RedirectOriginalUrlUseCase(
            inMemoryUrlRepository,
        )
    })

    it('should be able to redirect a original url', async () => {
        const shortId = 'abcd'
        const originalUrl = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map'

        const url = makeUrl({
            shortId: shortId,
            original: originalUrl
        })

        await inMemoryUrlRepository.create(url)

        const result = await sut.execute({
            shortId: url.shortId
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({
            url: expect.objectContaining({
                props: expect.objectContaining({
                    original: originalUrl
                })
            })
        })

        expect(inMemoryUrlRepository.items).toHaveLength(1)
    })

    it('should not redirect if url not exists', async () => {
        const result = await sut.execute({
            shortId: 'abcde'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    })

    it('should not redirect if url is expired', async () => {
        const expiredUrl = makeUrl({
            shortId: 'exprd',
            original: 'http://expired.com',
            expiresAt: new Date(Date.now() - 1000) // expirado
        })

        await inMemoryUrlRepository.create(expiredUrl)

        const result = await sut.execute({
            shortId: 'exprd'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(UrlExpiredError)
    })
})