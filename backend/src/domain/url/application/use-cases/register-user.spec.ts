import { RegisterUserUseCase } from "./register-user"
import { InMemoryUserRepository } from "test/repositories/in-memory-user-repository"

import { makeUser } from "test/factories/make-user"
import { FakeHasher } from "test/cryptography/fake-hasher"

import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

let fakeHasher: FakeHasher
let inMemoryUserRepository: InMemoryUserRepository
let sut: RegisterUserUseCase

describe('Register User Use Case', () => {
    beforeEach(() => {
        inMemoryUserRepository = new InMemoryUserRepository()
        fakeHasher = new FakeHasher()
        sut = new RegisterUserUseCase(
            inMemoryUserRepository,
            fakeHasher
        )
    })

    it('should be able to register a new user', async () => {
        const result = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({
            user: expect.objectContaining({
                name: 'John Doe'
            })
        })
    })

    it('should hash user password upon registration', async () => {
        const result = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        const hashedPassword = await fakeHasher.hash('123456')

        expect(result.isRight()).toBe(true)
        expect(inMemoryUserRepository.items[0].password).toEqual(hashedPassword)
    })

    it('should not be able to register a user with same email', async () => {
        const user = makeUser({
            email: 'johndoe@example.com'
        })

        await inMemoryUserRepository.create(user)

        const result = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
    })
})