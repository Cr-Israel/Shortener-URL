import z from "zod";

export const ShortenUrlSchema = z.object({
  // userId: z.string(),
  original: z.string(),
})

export const ResponseShortenUrlSchema = z.object({
  id: z.string(),
//   userId: z.string(),
  shortId: z.string(),
  original: z.string(),
})

// export const FetchUrlSchema = z.object({
//   tag: z.string().optional(),
//   page: z.coerce.number().min(1).default(1)
// })

// export const ResponseFetchUrlSchema = z.array(ResponseRegisterUrlSchema)

// export const FetchUrlByTagSchema = z.object({
//   tag: z.string(),
//   page: z.coerce.number().min(1).default(1)
// })

// export const DeleteUrlSchema = z.object({
//   id: z.string()
// })

export const ResponseDeleteUrlSchema = z.object({})