import { defineCollection, z } from 'astro:content';

const tools = defineCollection({
  type: 'content',
  schema: z.object({
    seoTitle: z.string(),
    title: z.string(),
    description: z.string(),
    intro: z.string(),
    keywords: z.string().optional(),
    category: z.enum(['calculators', 'text-tools', 'qr-code', 'generators', 'timers']),
    icon: z.string(),
    featured: z.boolean().default(false),
    whatIs: z.array(z.string()),
    features: z.array(z.string()),
    useCases: z.array(z.object({
      title: z.string(),
      description: z.string()
    })),
    method: z.object({
      title: z.string(),
      description: z.array(z.string()),
      formula: z.string().optional(),
      example: z.string()
    }),
    limitations: z.array(z.string()),
    relatedTools: z.array(z.string()).default([]),
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
