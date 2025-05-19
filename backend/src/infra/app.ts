import { ZodError } from "zod";
import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { shortenRoutes } from "./infra/routes/shorten";
import { env } from "./infra/env/env";
// import { fastifySwagger } from "@fastify/swagger";
// import { fastifySwaggerUi } from "@fastify/swagger-ui";

// import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";


export const app = fastify()

app.register(fastifyCors, { origin: "*" })

// app.register(fastifySwagger, {
//   openapi: {
//     info: {
//       title: 'Typed VUTTR API',
//       version: '1.0.0'
//     }
//   },
//   transform: jsonSchemaTransform
// })

// app.register(fastifySwaggerUi, {
//   routePrefix: '/docs',
// })

// Routes 👇🏻
app.get('/ping', () => {
  return 'pong'
})

app.register(shortenRoutes)


app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: '❎ Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: '✖️ Internal server error' })
})