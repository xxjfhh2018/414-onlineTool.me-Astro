import { defineCollection, z } from 'astro:content';

const calculationDetailsSchema = z.object({
  formula: z.string().optional(),
  steps: z.array(z.string()).default([]),
  rounding: z.string().optional(),
  sources: z.array(z.object({
    name: z.string(),
    url: z.string().url(),
    publisher: z.string().optional(),
    accessedDate: z.string().optional(),
  })).default([]),
  version: z.string().optional(),
  applicableDate: z.string().optional(),
  lastVerified: z.string().optional(),
  updateResponsibility: z.string().optional(),
  resultLabel: z.enum([
    'Exact calculation',
    'Planning estimate',
    'Estimated equivalent',
    'Demonstration',
    'Version-specific result',
  ]).optional(),
  assumptions: z.array(z.string()).default([]),
  example: z.object({
    inputs: z.string(),
    calculation: z.string(),
    result: z.string(),
  }).optional(),
});

const tools = defineCollection({
  type: 'content',
  schema: z.object({
    seoTitle: z.string(),
    title: z.string(),
    description: z.string(),
    intro: z.string(),
    keywords: z.string().optional(),
    category: z.enum(['calculators', 'sports', 'converters', 'text-tools', 'qr-code', 'generators', 'timers']),
    subcategory: z.enum(['education', 'games', 'engineering', 'everyday', 'finance']).optional(),
    icon: z.string(),
    featured: z.boolean().default(false),
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
    }).optional(),
    calculationDetails: calculationDetailsSchema.optional(),
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
