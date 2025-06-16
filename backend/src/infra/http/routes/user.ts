import { z } from "zod";

import { FastifyTypedInstance } from "@/infra/types/fastify-type-instance";

import { LoginSchema, RegisterSchema } from "@/infra/http/schemas/auth.schema";

import { RegisterUserController } from "../controllers/register-user.controller";
import { AuthenticateUserController } from "../controllers/authenticate.controller";

export function userRoutes(app: FastifyTypedInstance) {
  app.post('/user', {
    schema: {
      tags: ['users'],
      description: 'Create User',
      body: RegisterSchema,
      response: {
        201: z.object({
          message: z.string()
        })
      }
    }
  }, new RegisterUserController().handle)

  app.post('/sessions', {
    schema: {
      tags: ['users'],
      description: 'Authenticate User',
      body: LoginSchema,
      response: {
        200: z.object({
          access_token: z.string()
        })
      }
    }
  }, new AuthenticateUserController().handle)
}