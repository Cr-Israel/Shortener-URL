import { FastifyRequest } from "fastify";

export interface UserPayload {
  sub: string
  iat?: number
  exp?: number
}

export function getCurrentUser(request: FastifyRequest): UserPayload {
  return request.user as UserPayload
}