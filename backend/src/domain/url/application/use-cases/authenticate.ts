import { Either, left, right } from "@/core/either"

import { Encrypter } from "../cryptography/encrypter"
import { HashComparer } from "../cryptography/hash-comparer"
import { UserRepository } from "../repositories/user-repository"

import { WrongCredendialsError } from "./errors/wrong-credentials-error"


export interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

export type AuthenticateUserUseCaseResponse = Either<
  WrongCredendialsError,
  {
    accessToken: string
  }
>

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter
  ) { }

  async execute({
    email,
    password
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      return left(new WrongCredendialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password
    )

    if (!isPasswordValid) {
      return left(new WrongCredendialsError())
    }

    const accessToken = await this.encrypter.encrypt({ sub: user.id.toString() })

    return right({
      accessToken
    })
  }
}