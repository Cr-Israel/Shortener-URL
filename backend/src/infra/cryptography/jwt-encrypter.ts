import { Encrypter } from "@/domain/url/application/cryptography/encrypter";

import { FastifyTypedInstance } from "../types/fastify-type-instance";
import { FastifyJWT } from "@fastify/jwt";

export class JwtEncrypter implements Encrypter {
  constructor(
    private jwtService: FastifyTypedInstance["jwt"]
    // private static jwtService: FastifyJWT
  ) {}

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.sign(payload)
    // return JwtEncrypter.jwtService.sign(payload)
  }

  async sign(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.sign(payload)
  }
}