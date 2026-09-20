import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog");

export type BlogPostMeta = {
  title: string;
  description: string;
  slug: string;
  date: string;
  tags: string[];
  readingTime: number;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

function getReadingTime(content: string) {
  const plainText = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_>`|\[\]()-]/g, " ");
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

function parsePost(fileName: string): BlogPost {
  const source = fs.readFileSync(path.join(BLOG_DIRECTORY, fileName), "utf8");
  const { data, content } = matter(source);
  const requiredFields = ["title", "description", "slug", "date", "tags"] as const;

  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Frontmatter inválido em ${fileName}: campo "${field}" ausente.`);
    }
  }

  if (!Array.isArray(data.tags) || data.tags.some((tag) => typeof tag !== "string")) {
    throw new Error(`Frontmatter inválido em ${fileName}: "tags" deve ser uma lista de textos.`);
  }

  return {
    title: String(data.title),
    description: String(data.description),
    slug: String(data.slug),
    date: String(data.date),
    tags: data.tags,
    readingTime: getReadingTime(content),
    content,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) return [];

  return fs
    .readdirSync(BLOG_DIRECTORY)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(parsePost)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((post) => ({
      title: post.title,
      description: post.description,
      slug: post.slug,
      date: post.date,
      tags: post.tags,
      readingTime: post.readingTime,
    }));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  if (!fs.existsSync(BLOG_DIRECTORY)) return undefined;

  const fileName = fs
    .readdirSync(BLOG_DIRECTORY)
    .filter((name) => name.endsWith(".mdx"))
    .find((name) => {
      const { data } = matter.read(path.join(BLOG_DIRECTORY, name));
      return data.slug === slug;
    });

  return fileName ? parsePost(fileName) : undefined;
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}
