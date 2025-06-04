import { UseCaseError } from "@/core/errors/use-case-error";

export class UrlExpiredError extends Error implements UseCaseError {
  constructor() {
    super(`URL already expired.`)
  }
}