import { Either, left, right } from "@/core/either"
import { User } from "../../enterprise/entities/user"
import { HashGenerator } from "../cryptography/hash-generator"
import { UserRepository } from "../repositories/user-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

export interface RegisterUserUseCaseRequest {
    name: string
    email: string
    password: string
}

export type RegisterUserUseCaseResponse = Either<
    UserAlreadyExistsError,
    {
        user: User
    }
>

export class RegisterUserUseCase {
    constructor(
        private userRepository: UserRepository,
        private hashGenerator: HashGenerator
    ) { }

    async execute({
        name,
        email,
        password
    }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
        const userAlreadyExists = await this.userRepository.findByEmail(email)

        if(userAlreadyExists) {
            return left(new UserAlreadyExistsError(email))
        }

        const hashedPassword = await this.hashGenerator.hash(password)

        const user = User.create({
            name,
            email,
            password: hashedPassword
        })

        await this.userRepository.create(user)

        return right({
            user
        })
    }
}