import { UseCaseError } from "@/core/errors/use-case-error";

export class UrlAlreadyShortenerError extends Error implements UseCaseError {
  constructor(url: string) {
    super(`URL "${url}" already exists.`)
  }
}