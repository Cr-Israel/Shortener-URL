import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../database/prisma";

export async function redirectUrl(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    const entry = await prisma.url.findUnique({
      where: { shortId: id }
    })

    if (!entry) {
      return reply.status(404).send({ message: 'URL not found' });
    }

    return reply.redirect(entry.original);
}