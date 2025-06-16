import { app } from "../app";
import { JwtEncrypter } from "@/infra/cryptography/jwt-encrypter";

let instance: JwtEncrypter | null = null

export function getJwtEncrypter(): JwtEncrypter {
  if(!instance) {
    instance = new JwtEncrypter(app.jwt)
  }
  return instance
}