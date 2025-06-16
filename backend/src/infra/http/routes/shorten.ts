import { FastifyInstance } from 'fastify';

import { authMiddleware } from '../middlewares/auth-middleware';
import { ResponseShortenUrlSchema, ShortenUrlSchema } from '../schemas/url.schema';

import { redirectUrl } from '../controllers/redirect-url.controller';
import { ShortenUrl } from '../controllers/shorten-url.controller';

export async function shortenRoutes(app: FastifyInstance) {
  app.post('/shorten', {
    preValidation: authMiddleware,
    schema: {
      tags: ['urls'],
      description: 'Shorten URL',
      body: ShortenUrlSchema,
      response: {
        201: ResponseShortenUrlSchema
      }
    }
  }, new ShortenUrl().handle);

  // app.get('/:id', redirectUrl);
}
