import { RegisterUrlUseCase } from "./short-url"
import { InMemoryUrlRepository } from "test/repositories/in-memory-url-repository"

import { makeUser } from "test/factories/make-user"

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
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({
            url: expect.objectContaining({
                name: 'John Doe'
            })
        })
    })

    it.skip('should hash url password upon registration', async () => {
        const result = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        const hashedPassword = await fakeHasher.hash('123456')

        expect(result.isRight()).toBe(true)
        expect(inMemoryUrlRepository.items[0].password).toEqual(hashedPassword)
    })
})