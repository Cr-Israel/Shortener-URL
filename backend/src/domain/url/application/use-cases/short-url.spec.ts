import { RegisterUrlUseCase } from "./short-url"
import { InMemoryUrlRepository } from "test/repositories/in-memory-url-repository"

let inMemoryUrlRepository: InMemoryUrlRepository
let sut: RegisterUrlUseCase

describe('Register Url Use Case', () => {
    beforeEach(() => {
        inMemoryUrlRepository = new InMemoryUrlRepository()
        sut = new RegisterUrlUseCase(
            inMemoryUrlRepository,
        )
    })

    it('should be able to register a new url', async () => {
        const result = await sut.execute({
            userId: '1',
            original: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map'
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({
            url: expect.objectContaining({
                props: expect.objectContaining({
                    original: result.value?.url.original
                })
            })
        })
    })
})