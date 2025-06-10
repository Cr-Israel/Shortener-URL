import { AuthenticateUserUseCase } from "./authenticate";

import { FakeHasher } from "test/cryptography/fake-hasher";
import { FakeEncrypter } from "test/cryptography/fake-encrypter";
import { InMemoryUserRepository } from "test/repositories/in-memory-user-repository";

import { WrongCredendialsError } from "./errors/wrong-credentials-error";

import { makeUser } from "test/factories/make-user";

let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let inMemoryUserRepository: InMemoryUserRepository

let sut: AuthenticateUserUseCase

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeEncrypter = new FakeEncrypter()
    fakeHasher = new FakeHasher()

    sut = new AuthenticateUserUseCase(
      inMemoryUserRepository,
      fakeHasher,
      fakeEncrypter
    )
  })

  it('should be able to authenticate an user', async () => {
    const user = makeUser({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456')
    })

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      email: user.email,
      password: '123456'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String)
    })
  })

  it('should not be able to authenticate an user with wrong credentials', async () => {
    const user = makeUser({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456')
    })

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      email: 'test@test.com',
      password: '123456'
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredendialsError)
  })
})