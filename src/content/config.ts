import { defineCollection, z } from 'astro:content';

const tools = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string().optional(),
    category: z.enum(['calculators', 'text-tools', 'qr-code', 'generators', 'timers']),
    icon: z.string(),
    featured: z.boolean().default(false),
    howToUse: z.array(z.object({
      step: z.number(),
      title: z.string(),
      description: z.string()
    })).optional(),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).optional(),
    ogImage: z.string().optional()
  })
});

export const collections = { tools };
