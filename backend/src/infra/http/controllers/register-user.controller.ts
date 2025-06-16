import z from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { RegisterUserSchema } from "@/infra/http/schemas/auth.schema";

import { makeRegisterUserUseCase } from "./factories/make-register-user-use-case";
import { UserAlreadyExistsError } from "@/domain/url/application/use-cases/errors/user-already-exists-error";

export class RegisterUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = request.body as z.infer<typeof RegisterUserSchema>

    const registerUserUseCase = makeRegisterUserUseCase()

    const result = await registerUserUseCase.execute({
      name,
      email,
      password
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserAlreadyExistsError:
          return reply.status(409).send({ message: error.message })
        default:
          return reply.status(500).send({ message: 'Unexpected error occurred' })
      }
    }

    reply.status(201).send({ message: 'User created' })
  }
}