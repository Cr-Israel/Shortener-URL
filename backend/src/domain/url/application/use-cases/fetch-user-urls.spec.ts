import { FetchUserUrlsUseCase } from "./fetch-user-urls"
import { InMemoryUrlRepository } from "test/repositories/in-memory-url-repository"

import { makeUrl } from "test/factories/make-url"
import { makeUser } from "test/factories/make-user"

let inMemoryUrlRepository: InMemoryUrlRepository
let sut: FetchUserUrlsUseCase

describe('Redirect Orignal Url Use Case', () => {
    beforeEach(() => {
        inMemoryUrlRepository = new InMemoryUrlRepository()
        sut = new FetchUserUrlsUseCase(
            inMemoryUrlRepository,
        )
    })

    it('should be able to redirect a original url', async () => {
        const user = makeUser()

        const url1 = makeUrl({ userId: user.id })
        const url2 = makeUrl({ userId: user.id })
        const url3 = makeUrl({ userId: user.id })

        await inMemoryUrlRepository.create(url1)
        await inMemoryUrlRepository.create(url2)
        await inMemoryUrlRepository.create(url3)

        const result = await sut.execute({
            userId: user.id.toString()
        })

        expect(result.isRight()).toBe(true)
        // expect(result.value?.urls[0].props.userId.toString()).toBe(user.id.toString())
        expect(result.value?.urls[0]).toEqual(expect.objectContaining({
            props: expect.objectContaining({
                userId: user.id
            })
        }))

        expect(inMemoryUrlRepository.items).toHaveLength(3)
    })
})