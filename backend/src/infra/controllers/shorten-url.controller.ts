import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";

export async function shortenUrl(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        url: z.string().url(),
    });

    const { url } = bodySchema.parse(request.body);

    // const urlAlreadyExists = await prisma.url.findFirst({s
    //   where: {
    //     original: url
    //   }
    // })

    // if(urlAlreadyExists) {
    //   return reply.status(409).send({ message: 'URL já encurtada'})
    // }

    const shortId = Math.random().toString(36).substr(2, 5)

    await prisma.url.create({
        data: {
            shortId,
            original: url
        }
    })

    return reply.status(201).send({
        shortUrl: `http://localhost:3333/${shortId}`,
    });
}