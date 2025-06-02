import { UniqueEntityID } from "@/core/entities/unique-entity-id"

import { makeUrl } from "test/factories/make-url"
import { RegisterUrlUseCase } from "./short-url"
import { InMemoryUrlRepository } from "test/repositories/in-memory-url-repository"

import { FakeShortIdGenerator } from "test/shortener/faker-short-id"

import { UrlAlreadyShortenerError } from "./errors/url-already-shortener-error"

let inMemoryUrlRepository: InMemoryUrlRepository
let shortIdGenerator: FakeShortIdGenerator
let sut: RegisterUrlUseCase

describe('Register Url Use Case', () => {
    beforeEach(() => {
        inMemoryUrlRepository = new InMemoryUrlRepository()
        shortIdGenerator = new FakeShortIdGenerator()
        sut = new RegisterUrlUseCase(
            inMemoryUrlRepository,
            shortIdGenerator
        )
    })

    it('should be able to shorten a new url', async () => {
        const originalUrl = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map'
        const result = await sut.execute({
            userId: '1',
            original: originalUrl
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({
            url: expect.objectContaining({
                props: expect.objectContaining({
                    original: originalUrl
                })
            })
        })
    })

    it('should not be able to shorten url that has not expired yet', async () => {
        const originalUrl = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map'

        const futureDate = new Date(Date.now() + 1000 * 60 * 60) // +1 hora
        const existingUrl = makeUrl({
            userId: new UniqueEntityID('1'),
            original: originalUrl,
            expiresAt: futureDate
        })

        await inMemoryUrlRepository.create(existingUrl)

        const result = await sut.execute({
            userId: '1',
            original: originalUrl
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(UrlAlreadyShortenerError)
    })

    it('should be able to shorten a URL that has already expired', async () => {
        const originalUrl = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map'

        const pastDate = new Date(Date.now() - 1000 * 60 * 60) // 1 hora no passado
        const existingUrl = makeUrl({
            userId: new UniqueEntityID('1'),
            original: originalUrl,
            expiresAt: pastDate
        })

        await inMemoryUrlRepository.create(existingUrl)

        const result = await sut.execute({
            userId: '1',
            original: originalUrl
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
        expect(inMemoryUrlRepository.items[0].expiresAt.getTime()).toBeGreaterThan(Date.now())
    })
})