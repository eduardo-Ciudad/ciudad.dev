import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getProjeto, hasCase } from "@/data/projetos";

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog");

export type BlogPostMeta = {
  title: string;
  description: string;
  slug: string;
  date: string;
  tags: string[];
  readingTime: number;
  caseSlug?: string;
  layout?: "editorial";
  serie?: string;
  cta?: "radar";
  relacionados?: string[];
  draft?: boolean;
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

  if (data.layout !== undefined && data.layout !== "editorial") {
    throw new Error(`Frontmatter inválido em ${fileName}: "layout" deve ser "editorial".`);
  }
  if (data.serie !== undefined && (typeof data.serie !== "string" || !data.serie.trim())) {
    throw new Error(`Frontmatter inválido em ${fileName}: "serie" deve ser um texto.`);
  }
  if (data.cta !== undefined && data.cta !== "radar") {
    throw new Error(`Frontmatter inválido em ${fileName}: "cta" deve ser "radar".`);
  }
  if (
    data.relacionados !== undefined &&
    (!Array.isArray(data.relacionados) || data.relacionados.some((slug) => typeof slug !== "string"))
  ) {
    throw new Error(`Frontmatter inválido em ${fileName}: "relacionados" deve ser uma lista de textos.`);
  }
  if (data.draft !== undefined && typeof data.draft !== "boolean") {
    throw new Error(`Frontmatter inválido em ${fileName}: "draft" deve ser booleano.`);
  }

  let caseSlug: string | undefined;
  if (data.case !== undefined) {
    const projeto = typeof data.case === "string" ? getProjeto(data.case) : undefined;

    if (typeof data.case !== "string" || !data.case.trim() || !projeto || !hasCase(projeto)) {
      throw new Error(
        `Frontmatter inválido em ${fileName}: "case" não corresponde a nenhum case publicado.`,
      );
    }

    caseSlug = data.case;
  }

  return {
    title: String(data.title),
    description: String(data.description),
    slug: String(data.slug),
    date: String(data.date),
    tags: data.tags,
    readingTime: getReadingTime(content),
    caseSlug,
    layout: data.layout,
    serie: data.serie,
    cta: data.cta,
    relacionados: data.relacionados,
    draft: data.draft,
    content,
  };
}

function isPublished(post: BlogPost) {
  return process.env.NODE_ENV !== "production" || post.draft !== true;
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) return [];

  return fs
    .readdirSync(BLOG_DIRECTORY)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(parsePost)
    .filter(isPublished)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((post) => ({
      title: post.title,
      description: post.description,
      slug: post.slug,
      date: post.date,
      tags: post.tags,
      readingTime: post.readingTime,
      caseSlug: post.caseSlug,
      layout: post.layout,
      serie: post.serie,
      cta: post.cta,
      relacionados: post.relacionados,
      draft: post.draft,
    }));
}

export function getPostsByCase(caseSlug: string): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.caseSlug === caseSlug);
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

  if (!fileName) return undefined;
  const post = parsePost(fileName);
  return isPublished(post) ? post : undefined;
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}
