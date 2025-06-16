import z from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { LoginSchema } from "@/infra/http/schemas/auth.schema";

import { WrongCredendialsError } from "@/domain/url/application/use-cases/errors/wrong-credentials-error";

import { makeAuthenticateUserUseCase } from "./factories/make-authenticate-use-case";

export class AuthenticateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as z.infer<typeof LoginSchema>

    const authenticateUseCase = makeAuthenticateUserUseCase()

    const result = await authenticateUseCase.execute({email, password})

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredendialsError:
          return reply.status(401).send({ message: error.message })
        default:
          return reply.status(500).send({ message: 'Unexpected error occurred' })
      }
    }

    const { accessToken } = result.value

    reply.status(200).send({ access_token: accessToken })
  }
}