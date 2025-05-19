import { FastifyInstance } from 'fastify';
import { shortenUrl } from '../controllers/shorten-url.controller';
import { redirectUrl } from '../controllers/redirect-url.controller';

export async function shortenRoutes(app: FastifyInstance) {
  app.post('/shorten', shortenUrl);

  app.get('/:id', redirectUrl);
}
