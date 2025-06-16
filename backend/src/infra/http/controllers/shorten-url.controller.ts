import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { getCurrentUser } from "@/infra/decorators/current-user-decorator";

import { ShortenUrlSchema } from "../schemas/url.schema";
import { makeShortUrlUseCase } from "./factories/make-short-url-use-case";

export class ShortenUrl {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { original } = request.body as z.infer<typeof ShortenUrlSchema>
        const currentUser = getCurrentUser(request)
        const userId = currentUser.sub

        const shortUrlUseCase = makeShortUrlUseCase()

        const result = await shortUrlUseCase.execute({
            original,
            userId
        })

        if(result.isLeft()) {
            return reply.code(500).send({error: 'Failed to short url'})
        }

        const shortId = result.value.url.shortId

        return reply.status(201).send({
            shortUrl: `http://localhost:3333/${shortId}`,
        });
    }
}