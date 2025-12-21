import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const photos = defineCollection({
	loader: glob({ base: "./src/content/photos", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional().default(""),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		// thumbnail / hero image for the post (put files in /public/photos/)
		heroImage: z.string(),
		// optional extra images for a mini-gallery inside the post
		images: z
			.array(
				z.object({
					src: z.string(),
					alt: z.string().optional().default(""),
					caption: z.string().optional().default(""),
				})
			)
			.optional(),
		tags: z.array(z.string()).optional(),
	}),
});

export const collections = { blog, photos };
