import { FastifyRequest, FastifyReply } from "fastify";

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
    console.log('Decoded user:', request.user)

    if (!request.user || typeof request.user !== 'object' || !('sub' in request.user)) {
      throw new Error('Invalid JWT payload')
    }
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized." })
  }
}